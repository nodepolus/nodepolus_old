const publicIp = require('public-ip');

import { Socket, createSocket, RemoteInfo } from 'dgram'
import { EventEmitter } from 'events'

import { Room } from './util/Room'
import Connection from './util/Connection'
import { Packet as Subpacket } from './packets/UnreliablePacket'
import { addr2str } from './util/misc'
import { RoomListing } from './packets/Subpackets/GameSearchResults'

export interface ServerConfig {
  port: number,
  accessibleIP?: string,
  accessiblePort?: number
}

export class Server extends EventEmitter {
    config: ServerConfig
    sock?: Socket;
    rooms: Map<string, Room> = new Map();
    clientConnectionMap: Map<string, Connection>;
    private clientIDIncrementer = 256;
    constructor(config: ServerConfig = {
      port: 22023
    }) {
        super();
        this.config = config
        this.clientConnectionMap = new Map();
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
      this.sock.on("message", (msg, remote) => {
        const connection = this.getConnection(remote);
        connection?.emit("message", msg);
      });
      this.sock.bind(this.config.port);
    }
    public close(reason:string|number = 19) {
      return new Promise((resolve) => {
        [...this.rooms.values()].forEach((room:Room) => {
          room.close(reason)
        })
        this.clientConnectionMap = new Map();
        this.sock?.close(resolve);
      })
    }
    private handlePacket(packet: Subpacket, connection: Connection){
        switch(packet.type) {
            case 'GameCreate': {
                let room = new Room();
                room.settings = packet.RoomSettings;
                this.emit("roomCreated", room);
                this.rooms.set(room.code, room);
                connection.send({
                  type: 'SetGameCode',
                  RoomCode: room.code
                });
                room.on('close', () => {
                  this.rooms.delete(room.code);
                })
                break;
            }
            case 'JoinGame':
              const room = this.rooms.get(packet.RoomCode);

              if (room) {
                connection.moveRoom(room);
              } else {
                connection.disconnect();
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
                  IP: this.config.accessibleIP || '-1.-1.-1.-1',
                  Port: this.config.accessiblePort || -1,
                  RoomCode: room.code,
                  RoomName: room.host?.player?.name || 'Unknown room name',
                  PlayerCount: room.connections.length,
                  Age: 0n,
                  MapID: room.settings.Map,
                  ImpostorCount: room.settings.ImpostorCount,
                  MaxPlayers: room.settings.MaxPlayers
                })
              }
              connection.send({
                type: "GameSearchResults",
                SkeldGameCount: MapCounts[0],
                MiraHQGameCount: MapCounts[1],
                PolusGameCount: MapCounts[2],
                RoomList
              })
            default:
              connection?.player?.room?.handlePacket(packet, connection);
              break;
        }
    }

    private getConnection (remote: RemoteInfo): Connection | null {
      let connection: Connection | undefined | null = this.clientConnectionMap.get(addr2str(remote));
      if (!connection) connection = this.buildConnection(remote);
      if (!connection) return null
      return connection
    }

    private buildConnection(remote: RemoteInfo): Connection | null {
      if (!this.sock) return null

        let conn = new Connection(remote, this.sock, true, this.requestClientID())
        this.clientConnectionMap.set(addr2str(remote), conn);
        conn.on("packet", (packet: Subpacket) => {
            this.handlePacket(packet, conn)
        });
        conn.on("close", () => {
            this.clientConnectionMap.delete(addr2str(remote));
        })
        return conn
    }
    private requestClientID() {
        return this.clientIDIncrementer++;
    }
}