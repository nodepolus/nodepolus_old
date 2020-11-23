const publicIp = require("public-ip");

import { Socket, createSocket, RemoteInfo } from "dgram";

import { Room } from "./util/room";
import { Connection } from "./util/connection";
import { Packet as Subpacket } from "./packets/unreliablePacket";
import { addr2str } from "./util/misc";
import { RoomListing } from "./packets/subpackets/gameSearchResults";
import { AsyncEventEmitter, Events } from "./util/asyncEventEmitter";
import {
  DisconnectReason,
  DisconnectReasons,
} from "./packets/packetElements/disconnectReason";

import {
  ConnectionEvent,
  RoomCreationEvent,
  JoinRoomRequestEvent,
  RoomListingRequestEvent,
  DisconnectionEvent,
} from "./events";
import { GameState } from "./data/enums/gameState";
import { LimboState } from "./data/enums/limboState";

export interface ServerConfig {
  port?: number;
  accessibleIP?: string;
  accessiblePort?: number;
}

type ServerEvents = Events & {
  listening: (port: number) => Promise<void>;
  connection: (event: ConnectionEvent) => Promise<void>;
  disconnection: (event: DisconnectionEvent) => Promise<void>;
  message: (message: Buffer) => Promise<void>;
  roomCreated: (event: RoomCreationEvent) => Promise<void>;
  joinRoomRequest: (event: JoinRoomRequestEvent) => Promise<void>;
  roomListingRequest: (event: RoomListingRequestEvent) => Promise<void>;
};

export class Server extends AsyncEventEmitter<ServerEvents> {
  config: ServerConfig;
  sock: Socket;
  rooms: Map<string, Room> = new Map();
  connections: Map<string, Connection>;
  private clientIDIncrementer = 256;
  constructor(
    config: ServerConfig = {
      port: 22023,
    }
  ) {
    super();
    this.config = config;
    this.connections = new Map();
    this.sock = createSocket("udp4");
  }
  public listen() {
    if (!this.config.accessibleIP) {
      let gthis = this;
      publicIp
        .v4()
        .then((result: string) => {
          gthis.config.accessibleIP = result;
        })
        .catch((err: Error) => {
          throw err;
        });
    }
    if (!this.config.accessiblePort) {
      this.config.accessiblePort = this.config.port;
    }
    this.sock = createSocket("udp4");
    this.sock.on("listening", () => this.emit("listening", this.config.port));
    this.sock.on("message", async (msg, remote) => {
      const connection = await this.getConnection(remote);
      if (connection) {
        await connection.emit("message", msg);
      }
    });
    this.sock.bind(this.config.port);
    console.log(`Server listening on port ${this.config.port}`);
  }
  public close(reason: string | number = 19) {
    return new Promise((resolve) => {
      [...this.rooms.values()].forEach((room: Room) => {
        room.close(reason);
      });
      this.connections = new Map();
      this.sock.close(resolve);
    });
  }
  private async handlePacket(packet: Subpacket, connection: Connection) {
    switch (packet.type) {
      case "GameCreate":
        {
          let room = new Room();
          room.settings = packet.RoomSettings;
          let roomEvent = new RoomCreationEvent(room);
          await this.emit("roomCreated", roomEvent);
          if (roomEvent.isCanceled) {
            room.close();
            connection.disconnect(roomEvent.cancelReason);
            return;
          }
          this.rooms.set(room.code, room);
          connection.send({
            type: "SetGameCode",
            RoomCode: room.code,
          });
          room.on("close", () => {
            this.rooms.delete(room.code);
          });
        }
        break;
      case "JoinGame":
        {
          // TODO: WaitForHost/Rejoin events, or add an `isRejoining` flag to
          //       the `joinRoomRequest` event
          let joinRoomRequestEvent = new JoinRoomRequestEvent(
            packet.RoomCode,
            connection
          );
          await this.emit("joinRoomRequest", joinRoomRequestEvent);
          await connection.emit("joinRoomRequest", joinRoomRequestEvent);
          if (joinRoomRequestEvent.isCanceled) {
            connection.disconnect();
            let room = this.rooms.get(packet.RoomCode);
            if (room && room.connections.length == 0) {
              room.close();
            }
          }

          const newRoom = this.rooms.get(packet.RoomCode);

          if (newRoom) {
            let state = newRoom.gameState;

            if (state == GameState.Started) {
              connection.disconnect(
                new DisconnectReason(DisconnectReasons.GameStarted)
              );
            } else if (state == GameState.Ended) {
              if (connection.room.code != newRoom.code) {
                // The player was not in the game, so they're not rejoining
                connection.disconnect(
                  new DisconnectReason(DisconnectReasons.GameStarted)
                );
              } else {
                newRoom.limboIds.splice(
                  newRoom.limboIds.indexOf(connection.ID),
                  1
                );

                if (!newRoom.hasHost) {
                  connection.isHost = true;
                  newRoom.hasHost = true;
                }

                if (connection.isHost) {
                  newRoom.connections.push(connection);
                  newRoom.gameState = GameState.NotStarted;
                  connection.limbo = LimboState.NotLimbo;
                  connection.startPacketGroup();
                  connection.send({
                    type: "JoinedGame",
                    RoomCode: newRoom.code,
                    PlayerClientID: connection.ID,
                    HostClientID: connection.ID,
                    OtherPlayers: newRoom.connections
                      .map((otherPlayer) => BigInt(otherPlayer.ID))
                      .filter((otherId) => otherId != BigInt(connection.ID)),
                  });
                  connection.send({
                    type: "AlterGame",
                    RoomCode: newRoom.code,
                    AlterGameTag: 1,
                    IsPublic: !!newRoom.publicity,
                  });
                  connection.endPacketGroup();
                  newRoom.connections
                    .filter((player) => player.limbo == LimboState.NotLimbo)
                    .filter((player) => player.ID != connection.ID)
                    .forEach((otherPlayer) => {
                      otherPlayer.send({
                        type: "PlayerJoinedGame",
                        RoomCode: newRoom.code,
                        PlayerClientID: connection.ID,
                        HostClientID: connection.ID,
                      });
                    });

                  newRoom.connections
                    .filter(
                      (waitingPlayer) =>
                        waitingPlayer.limbo == LimboState.WaitingForHost
                    )
                    .forEach((waitingPlayer) => {
                      waitingPlayer.startPacketGroup();
                      waitingPlayer.send({
                        type: "JoinedGame",
                        RoomCode: newRoom.code,
                        PlayerClientID: waitingPlayer.ID,
                        HostClientID: connection.ID,
                        OtherPlayers: newRoom.connections
                          .map((otherPlayer) => BigInt(otherPlayer.ID))
                          .filter(
                            (otherId) => otherId != BigInt(waitingPlayer.ID)
                          ),
                      });
                      waitingPlayer.send({
                        type: "AlterGame",
                        RoomCode: newRoom.code,
                        AlterGameTag: 1,
                        IsPublic: !!newRoom.publicity,
                      });
                      waitingPlayer.limbo = LimboState.NotLimbo;
                      waitingPlayer.endPacketGroup();
                    });
                } else {
                  newRoom.connections.push(connection);
                  connection.limbo = LimboState.WaitingForHost;
                  connection.send({
                    type: "WaitingForHost",
                    RoomCode: newRoom.code,
                    WaitingClientID: connection.ID,
                  });
                  newRoom.connections
                    .filter((con) => con.limbo == LimboState.NotLimbo)
                    .filter((con) => con.ID != connection.ID)
                    .forEach((recipient) => {
                      recipient.send({
                        type: "PlayerJoinedGame",
                        RoomCode: newRoom.code,
                        PlayerClientID: connection.ID,
                        HostClientID: newRoom.host!.ID,
                      });
                    });
                }
              }
            } else {
              connection.moveRoom(newRoom);
            }
          } else {
            connection.disconnect(
              new DisconnectReason(DisconnectReasons.GameNotFound)
            );
          }
        }
        break;
      case "GameSearch":
        let rooms = [...this.rooms.values()];
        let MapCounts: number[] = [0, 0, 0];
        let RoomList: RoomListing[] = [];
        for (var i = 0; i < rooms.length; i++) {
          let room = rooms[i];
          MapCounts[room.settings.Map]++;
          if (
            packet.RoomSettings.Language != 0 &&
            room.settings.Language != packet.RoomSettings.Language
          )
            break;
          if (
            packet.RoomSettings.ImpostorCount != 0 &&
            room.settings.ImpostorCount != packet.RoomSettings.ImpostorCount
          )
            break;
          if ((packet.RoomSettings.Map & (2 ** room.settings.Map)) === 0) break;

          if (!this.config.accessibleIP || !this.config.accessiblePort) {
            console.warn(
              "Not returning returning gameList result because missing accessibleIP or accessiblePort"
            );
            return;
          }

          if (!room.host) {
            throw new Error("Room is missing host, aborting gameSearchResult");
          }

          RoomList.push({
            IP: this.config.accessibleIP,
            Port: this.config.accessiblePort,
            RoomCode: room.code,
            RoomName: room.host?.name || "unknown",
            PlayerCount: room.connections.length,
            Age: 0n,
            MapID: room.settings.Map,
            ImpostorCount: room.settings.ImpostorCount,
            MaxPlayers: room.settings.MaxPlayers,
          });
        }
        let roomListingRequestEvent = new RoomListingRequestEvent(
          {
            includePrivate: packet.IncludePrivate,
            filter: packet.RoomSettings,
          },
          {
            SkeldRoomCount: MapCounts[0],
            MiraHQRoomCount: MapCounts[1],
            PolusRoomCount: MapCounts[2],
            Rooms: RoomList,
          }
        );
        this.emit("roomListingRequest", roomListingRequestEvent);
        if (roomListingRequestEvent.isCanceled) {
          roomListingRequestEvent.response.SkeldRoomCount = 0;
          roomListingRequestEvent.response.MiraHQRoomCount = 0;
          roomListingRequestEvent.response.PolusRoomCount = 0;
          roomListingRequestEvent.response.Rooms = [];
        }
        connection.send({
          type: "GameSearchResults",
          SkeldGameCount: roomListingRequestEvent.response.SkeldRoomCount,
          MiraHQGameCount: roomListingRequestEvent.response.MiraHQRoomCount,
          PolusGameCount: roomListingRequestEvent.response.PolusRoomCount,
          RoomList: roomListingRequestEvent.response.Rooms,
        });
      default:
        connection.room.handlePacket(packet, connection);
        break;
    }
  }

  private async getConnection(
    remote: RemoteInfo
  ): Promise<Connection | undefined> {
    let connection = this.connections.get(addr2str(remote));
    if (!connection) {
      connection = this.buildConnection(remote);
      let conEvt = new ConnectionEvent(connection);
      await this.emit("connection", conEvt);
      if (conEvt.isCanceled) {
        connection.disconnect(conEvt.cancelReason);
      } else {
        return connection;
      }
    } else {
      return connection;
    }
  }

  private buildConnection(remote: RemoteInfo): Connection {
    let conn = new Connection(remote, this.sock, true, this.requestClientID());
    this.connections.set(addr2str(remote), conn);
    conn.on("packet", async (packet: Subpacket) => {
      this.handlePacket(packet, conn);
    });
    conn.on("close", async () => {
      this.connections.delete(addr2str(remote));
      let de = new DisconnectionEvent(conn);
      this.emit("disconnection", de);
      conn.emit("disconnection", de);
    });
    return conn;
  }
  private requestClientID() {
    return this.clientIDIncrementer++;
  }
}
