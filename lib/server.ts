const publicIp = require('public-ip');

import { Socket, createSocket, RemoteInfo } from 'dgram'

import { Room } from './util/Room'
import Connection from './util/Connection'
import { Packet as Subpacket } from './packets/UnreliablePacket'
import { addr2str } from './util/misc'
import { RoomListing } from './packets/Subpackets/GameSearchResults'
import ConnectionEvent from './events/ConnectionEvent';
import AsyncEventEmitter from './util/AsyncEventEmitter';
import RoomCreationEvent from './events/RoomCreationEvent';
import JoinRoomRequestEvent from './events/JoinRoomRequestEvent';
import DisconnectReason, { DisconnectReasons } from './packets/PacketElements/DisconnectReason';
import RoomListingRequestEvent from './events/RoomListingRequestEvent';
import DisconnectionEvent from './events/DisconnectionEvent';

export interface ServerConfig {
  port?: number
  accessibleIP?: string,
  accessiblePort?: number
}

export class Server extends AsyncEventEmitter {
	config: ServerConfig
	sock: Socket;
	rooms: Map<string, Room> = new Map();
	connections: Map<string, Connection>;
	private clientIDIncrementer = 256;
	constructor(config: ServerConfig = {
    port: 22023
  }) {
    super();
    this.config = config
    this.connections = new Map();
    this.sock = createSocket('udp4')
	}
	public listen() {
	  if (!this.config.accessibleIP) {
      let gthis = this;
      publicIp.v4().then((result:string) => {
        gthis.config.accessibleIP = result;
      }).catch((err:Error) => {
        throw err;
      })
	  }
	  if (!this.config.accessiblePort) {
	  	this.config.accessiblePort = this.config.port
	  }
    this.sock = createSocket("udp4");
	  this.sock.on("listening", () => this.emit("listening", this.config.port));
	  this.sock.on("message", async (msg, remote) => {
		const connection = await this.getConnection(remote);
		if(connection) {
			await connection.emit("message", msg);
		}
	  });
	  this.sock.bind(this.config.port);
	}
	public close(reason:string|number = 19) {
	  return new Promise((resolve) => {
      [...this.rooms.values()].forEach((room:Room) => {
        room.close(reason)
      })
      this.connections = new Map();
		  this.sock.close(resolve);
	  })
	}
  private async handlePacket(packet: Subpacket, connection: Connection){
		switch(packet.type) {
			case 'GameCreate': {
					let room = new Room();
					room.settings = packet.RoomSettings;
					let roomEvent = new RoomCreationEvent(room)
					await this.emit("roomCreated", roomEvent);
					if(roomEvent.isCanceled) {
						room.close()
						connection.disconnect(roomEvent.cancelReason)
						return
					}
					this.rooms.set(room.code, room);
					connection.send({
						type: 'SetGameCode',
						RoomCode: room.code
					});
					room.on('close', () => {
						this.rooms.delete(room.code);
					})
				}
				break;
			case 'JoinGame': {
					let joinRoomRequestEvent = new JoinRoomRequestEvent(packet.RoomCode, connection);
					await this.emit("joinRoomRequest", joinRoomRequestEvent)
					await connection.emit("joinRoomRequest", joinRoomRequestEvent)
					if(joinRoomRequestEvent.isCanceled) {
						connection.disconnect();
						let room = this.rooms.get(packet.RoomCode)
						if(room && room.connections.length == 0) {
							room.close()
						}
          }
          
          const newRoom = this.rooms.get(packet.RoomCode)

					if (newRoom) {
						connection.moveRoom(newRoom);
					} else {
						connection.disconnect(new DisconnectReason(DisconnectReasons.GameNotFound));
					}
				}
				break;
			case 'GameSearch':
			  let rooms = [...this.rooms.values()];
			  let MapCounts:number[] = [0,0,0];
			  let RoomList:RoomListing[] = [];
			  for (var i = 0; i < rooms.length; i++) {
				let room = rooms[i]
				MapCounts[room.settings.Map]++;
				if (packet.RoomSettings.Language != 0 && room.settings.Language != packet.RoomSettings.Language) break
				if (packet.RoomSettings.ImpostorCount != 0 && room.settings.ImpostorCount != packet.RoomSettings.ImpostorCount) break
				if ((packet.RoomSettings.Map & (2 ** room.settings.Map)) === 0) break

				RoomList.push({
				  IP: this.config.accessibleIP,
				  Port: this.config.accessiblePort,
				  RoomCode: room.code,
				  RoomName: room.host.name,
				  PlayerCount: room.connections.length,
				  Age: 0n,
				  MapID: room.settings.Map,
				  ImpostorCount: room.settings.ImpostorCount,
				  MaxPlayers: room.settings.MaxPlayers
				})
        }
        let roomListingRequestEvent = new RoomListingRequestEvent({
          includePrivate: packet.IncludePrivate,
          filter: packet.RoomSettings
        }, {
          SkeldRoomCount: MapCounts[0],
          MiraHQRoomCount: MapCounts[1],
          PolusRoomCount: MapCounts[2],
          Rooms: RoomList
		})
		this.emit("roomListingRequest", roomListingRequestEvent)
        if(roomListingRequestEvent.isCanceled) {
          roomListingRequestEvent.response.SkeldRoomCount = 0
          roomListingRequestEvent.response.MiraHQRoomCount = 0
          roomListingRequestEvent.response.PolusRoomCount = 0
          roomListingRequestEvent.response.Rooms = [];
        }
        connection.send({
          type: "GameSearchResults",
          SkeldGameCount: roomListingRequestEvent.response.SkeldRoomCount,
          MiraHQGameCount: roomListingRequestEvent.response.MiraHQRoomCount,
          PolusGameCount: roomListingRequestEvent.response.PolusRoomCount,
          RoomList: roomListingRequestEvent.response.Rooms
        })
			default:
			  connection.room.handlePacket(packet, connection);
			  break;
		}
	}

	private async getConnection (remote: RemoteInfo): Promise<Connection|undefined> {
		let connection = this.connections.get(addr2str(remote));
		if (!connection) {
			connection = this.buildConnection(remote);
			let conEvt = new ConnectionEvent(connection)
			await this.emit("connection", conEvt)
			if(conEvt.isCanceled) {
				connection.disconnect(conEvt.cancelReason)
			} else {
				return connection
			}
		} else {
			return connection
		}
  	}
  
	private buildConnection(remote:RemoteInfo): Connection {
		let conn = new Connection(remote, this.sock, true, this.requestClientID())
    this.connections.set(addr2str(remote), conn);
		conn.on("packet", (packet: Subpacket) => {
			this.handlePacket(packet, conn)
		});
		conn.on("close", () => {
			this.connections.delete(addr2str(remote));
			let de = new DisconnectionEvent(conn)
			this.emit("disconnection", de)
			conn.emit("disconnection", de)
		})
		return conn
	}
	private requestClientID() {
    return this.clientIDIncrementer++;
	}
}

export default Server