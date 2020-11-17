import { EventEmitter } from "events";
import * as randomstring from "randomstring";

import Connection from "./connection";
import Game from "./game";
import Publicity from "../data/enums/publicity";
import { RoomSettings } from "../packets/packetElements/roomSettings";
import { Packet as Subpacket } from "../packets/unreliablePacket";
import { IGameObject } from "./gameObject";
import { GameDataPacketType } from "../packets/subpackets/gameData";

import { addr2str } from "./misc";
import { RPCPacketType } from "../packets/subpackets/gameDataPackets/rpc";
import DisconnectReason from "../packets/packetElements/disconnectReason";
import PolusBuffer from "./polusBuffer";
import { DataPacket } from "../packets/subpackets/gameDataPackets/data";
import { ObjectType } from "../packets/subpackets/gameDataPackets/spawn";
import { Player } from "./player";
import { JoinRoomEvent } from "../events";
import { UpdateGameDataPacket } from "../packets/subpackets/gameDataPackets/rpcPackets/updateGameData";
import { GameDataPlayerData } from "../packets/packetElements/componentTypes";
import Task from "./task";

export declare interface Room {
  on(event: "close" | "playerJoined", listener: Function): this;
}

export class Room extends EventEmitter {
  constructor() {
    super();
    this.internalCode = randomstring.generate({
      length: 6,
      charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    });
  }
  private PlayerIDtoConnectionIDMap = new Map<number, bigint>();
  public connections: Connection[] = [];
  private internalCode: string;
  public get code(): string {
    return this.internalCode;
  }
  private internalSettings: RoomSettings = new RoomSettings(this);
  public get settings(): RoomSettings {
    return this.internalSettings;
  }
  public set settings(input: RoomSettings) {
    this.internalSettings = <RoomSettings>input;
    this.internalSettings.room = this;
    this.syncSettings();
  }
  public GameObjects: IGameObject[] = [];
  game?: Game;
  publicity?: Publicity = Publicity.Private;
  setCode(code: string) {
    this.internalCode = code;
    this.connections.forEach((singleCon) => {
      singleCon.send({
        type: "SetGameCode",
        RoomCode: this.code,
      });
    });
  }
  setPublicity(publicity: Publicity) {
    this.publicity = publicity;
    this.connections.forEach((singleCon) => {
      singleCon.send({
        type: "AlterGame",
        AlterGameTag: 1,
        IsPublic: publicity === Publicity.Public,
        RoomCode: this.code,
      });
    });
  }
  syncSettings(NetIDIn?: bigint) {
    let NetID = 0n;
    let go = this.GameObjects.find(
      (go) => Number(go.SpawnID) == ObjectType.Player
    );
    if (go) {
      NetID = go.Components[0].netID;
    }
    if (NetIDIn) {
      NetID = NetIDIn;
    }
    this.connections.forEach((singleCon) => {
      singleCon.send({
        type: "GameData",
        RoomCode: this.code,
        Packets: [
          {
            type: GameDataPacketType.RPC,
            RPCFlag: RPCPacketType.SyncSettings,
            NetID,
            Packet: {
              RoomSettings: this.settings,
            },
          },
        ],
      });
    });
  }
  get host(): Connection | undefined {
    return this.connections.find((con) => con?.isHost);
  }
  handlePacket(packet: Subpacket, connection: Connection) {
    switch (packet.type) {
      case "EndGame":
      case "StartGame":
        this.connections.forEach((otherClient) => {
          otherClient.send(packet);
        });
        break;
      case "KickPlayer":
      case "RemovePlayer":
        this.connections.forEach((otherClient) => {
          otherClient.send(packet);
        });
        //TODO: NOT SENT TO PLAYER BEING REMOVED / KICK
        //TODOPRIORITY: CRITICAL
        break;
      case "GameData":
        if (
          packet.RecipientClientID &&
          packet.RecipientClientID === 2147483646n
        ) {
          if (!this.host)
            throw new Error("Could not find host for gameData packet");
          connection.send({
            type: "RemovePlayer",
            RoomCode: this.code,
            PlayerClientID: 2147483646,
            HostClientID: this.host.ID,
            DisconnectReason: new DisconnectReason(
              new PolusBuffer(Buffer.from("00", "hex"))
            ),
          });
          packet.Packets.forEach((packet) => {
            if (packet.type == GameDataPacketType.Spawn) {
              if (Number(packet.SpawnID) == ObjectType.Player && packet.Components[0].Data?.type == 'PlayerControl') {
                if (packet.ClientID != 2147483646n) {
                  this.PlayerIDtoConnectionIDMap.set(packet.Components[0].Data.id, packet.ClientID)
                }
              }
            }
            if (
              packet.type == GameDataPacketType.Spawn &&
              Number(packet.SpawnID) == ObjectType.GameData &&
              packet.Components[0].Data?.type == "GameData"
            ) {
              this.GameObjects.push(packet);
            }
          });
          break;
        }
        packet.Packets = packet.Packets.filter((GDPacket) => {
          if(GDPacket.type == GameDataPacketType.Spawn) {
            if (Number(GDPacket.SpawnID) == ObjectType.Player && GDPacket.Components[0].Data?.type == 'PlayerControl') {
              if (GDPacket.ClientID != 2147483646n) {
                this.PlayerIDtoConnectionIDMap.set(GDPacket.Components[0].Data.id, GDPacket.ClientID)
                let connection = this.connections.find(con => con.ID == Number(GDPacket.ClientID))
                if(connection) {
                  connection.netIDs = GDPacket.Components.map(c => c.netID);
                } else {
                  throw new Error("Data recieved about undefined connection")
                }
              }
            }
          }
          if (GDPacket.type == GameDataPacketType.RPC) {
            if (GDPacket.RPCFlag == RPCPacketType.UpdateGameData) {
              let pd = (<UpdateGameDataPacket>GDPacket.Packet).PlayerData;
              if(connection.isHost && pd[0].PlayerName != '') {
                let connectionID = (this.PlayerIDtoConnectionIDMap.get(pd[0].PlayerID))
                let connection = this.connections.find(con => con.ID == Number(connectionID))
                if(connection) {
                  if(!connection.player) {
                    connection.player = new Player(<GameDataPlayerData><unknown>pd[0]);
                    connection.player.connection = connection
                    let joinRoomEvent = new JoinRoomEvent(connection.player, this);
                    process.nextTick((connection: Connection) => {
                      connection.emit("joinRoom", joinRoomEvent);
                      this.emit("playerJoined", joinRoomEvent);
                      if (joinRoomEvent.isCanceled) {
                        connection.disconnect();
                      }
                    }, connection)
                  } else {
                    this.startPacketGroupBroadcastToAll()
                    connection.player.setName(pd[0].PlayerName)
                    connection.player.setColor(pd[0].Color)
                    connection.player.setHat(Number(pd[0].HatID))
                    connection.player.setPet(Number(pd[0].PetID))
                    connection.player.setSkin(Number(pd[0].SkinID))
                    connection.player.setTasks(pd[0].Tasks.map((taskData) => {
                      let t = new Task(Number(taskData.TaskID));
                      if (taskData.TaskCompleted) {
                        t.Complete();
                      } else {
                        t.Uncomplete();
                      }
                      return t;
                    }), true)
                    this.endPacketGroupBroadcastToAll()
                  }
                  if(pd[0].Flags.Impostor) {
                    connection.player.setImpostor()
                  } else {
                    connection.player.setCrewmate()
                  }
                  if(pd[0].Flags.Dead) {
                    connection.player.setDead()
                  } else {
                    connection.player.revive()
                  }
                  return false;
                } else {
                  throw new Error("Data recieved for an undefined connection")
                }
              }
            }
          }
          if (GDPacket.type == GameDataPacketType.Spawn) {
            this.GameObjects.push(GDPacket);
          }
          if (GDPacket.type == GameDataPacketType.Data) {
            let gthis = this;
            this.GameObjects.forEach((gameObject, idx) => {
              let oldcomp = gameObject.Components.findIndex(
                (testcomp) =>
                  testcomp.netID == (<DataPacket>GDPacket).Component.netID
              );
              if (oldcomp != -1) {
                gthis.GameObjects[idx].Components[oldcomp] = (<DataPacket>(
                  GDPacket
                )).Component;
              }
            });
          }
          if (GDPacket.type == GameDataPacketType.Despawn) {
            let gthis = this;
            this.GameObjects.forEach((gameObject, idx) => {
              let cIdx = gameObject.Components.map((c) => c.netID).indexOf(
                GDPacket.NetID
              );
              if (cIdx != -1) {
                gthis.GameObjects[idx].Components.splice(cIdx, 1);
              }
            });
          }
          return true;
        });
        if (packet.RecipientClientID) {
          this.connections
            .filter((conn) => BigInt(conn.ID) == packet.RecipientClientID)
            .forEach((recipient) => {
              recipient.send(packet);
            });

          break;
        }
      default:
        this.connections
          .filter(
            (conn) => addr2str(conn.address) != addr2str(connection.address)
          )
          .forEach((otherClient) => {
            otherClient.send(packet);
          });
        break;
    }
  }
  handleNewConnection(connection: Connection) {
    if (!this.host) connection.isHost = true;
    this.connections.forEach((conn) => {
      conn.send({
        type: "PlayerJoinedGame",
        RoomCode: this.code,
        PlayerClientID: connection.ID,
        HostClientID: this.host?.ID || -1,
      });
    });
    this.connections.push(connection);
    connection.on("close", () => {
      this.connections.splice(this.connections.indexOf(connection), 1);
      if (connection.isHost && this.connections.length > 0) {
        this.connections[0].isHost = true;
      }
      this.connections.forEach((TSconnection) => {
        TSconnection.startPacketGroup();
        TSconnection.send({
          type: "RemovePlayer",
          RoomCode: this.code,
          PlayerClientID: connection.ID,
          HostClientID: this.host?.ID || -1,
          DisconnectReason: new DisconnectReason(0),
        });
        TSconnection.endPacketGroup();
      });
      if (this.connections.length === 0) {
        this.close();
      }
    });
  }
  public close(reason: string | number = 19) {
    let pb = new PolusBuffer();
    if (typeof reason == "number") {
      pb.writeU8(reason);
    } else {
      pb.writeU8(0x08);
      pb.writeString(reason);
    }
    this.emit("close");
    this.connections.forEach((TSconnection) => {
      TSconnection.send({
        type: "RemoveRoom",
        DisconnectReason: new DisconnectReason(pb),
      });
    });
  }
  public broadcastToAll(packet: Subpacket) {
    this.connections.forEach(con => {
      con.send(packet)
    })
  }
  public startPacketGroupBroadcastToAll() {
    this.connections.forEach(con => {
      con.startPacketGroup()
    })
  }
  public endPacketGroupBroadcastToAll() {
    this.connections.forEach(con => {
      con.endPacketGroup()
    })
  }
}
