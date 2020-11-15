import { EventEmitter } from 'events'
import * as randomstring from 'randomstring'

import Connection from './connection'
import Game from './game'
import Publicity from '../data/enums/publicity'
import { RoomSettings } from '../packets/packetElements/roomSettings'
import { Packet as Subpacket } from '../packets/unreliablePacket'
import { IGameObject } from './gameObject'
import { GameDataPacketType } from '../packets/subpackets/gameData'

import { addr2str } from './misc'
import { RPCPacketType } from '../packets/subpackets/gameDataPackets/rpc'
import DisconnectReason from '../packets/packetElements/disconnectReason'
import PolusBuffer from './polusBuffer'
import { DataPacket } from '../packets/subpackets/gameDataPackets/data'
import { ObjectType } from '../packets/subpackets/gameDataPackets/spawn'
import { Player } from './player'
import JoinRoomEvent from '../events/joinRoomEvent'

export declare interface Room {
    on(event: 'close', listener: Function): this
}

export class Room extends EventEmitter {
    constructor() {
        super();
        this.internalCode = randomstring.generate({
            length: 6,
            charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        })
    }
    public connections: Connection[] = [];
    private internalCode: string;
    public get code(): string {
        return this.internalCode
    }
    private internalSettings:RoomSettings = new RoomSettings(this);
    public get settings(): RoomSettings {
        return this.internalSettings
    };
    public set settings(input: RoomSettings) {
        this.internalSettings = <RoomSettings>input;
        this.internalSettings.room = this;
        this.syncSettings();
    };
    public GameObjects:IGameObject[] = [];
    game?: Game;
    publicity?: Publicity = Publicity.Private;
    setCode(code:string) {
        this.internalCode = code;
        this.connections.forEach(singleCon => {
            singleCon.send({
                type: "SetGameCode",
                RoomCode: this.code
            })
        })
    }
    setPublicity(publicity: Publicity) {
        this.publicity = publicity;
        this.connections.forEach(singleCon => {
            singleCon.send({
                type: "AlterGame",
                AlterGameTag: 1,
                IsPublic: publicity === Publicity.Public,
                RoomCode: this.code
            })
        })
    }
    syncSettings(NetIDIn?: bigint) {
        let NetID = 0n;
        let go = this.GameObjects.find(go => Number(go.SpawnID) == ObjectType.Player)
        if (go) {
            NetID = go.Components[0].netID
        }
        if (NetIDIn) {
            NetID = NetIDIn
        }
        this.connections.forEach(singleCon => {
            singleCon.send({
                type: "GameData",
                RoomCode: this.code,
                Packets: [
                    {
                        "type": GameDataPacketType.RPC,
                        "RPCFlag": RPCPacketType.SyncSettings,
                        NetID,
                        "Packet": {
                            RoomSettings: this.settings
                        }
                    }
                ]
            })
        })
    }
    get host(): Connection | undefined {
      return this.connections.find(con => con?.isHost);
    }
    handlePacket(packet: Subpacket, connection: Connection) {
        switch (packet.type) {
            case "EndGame":
            case "StartGame":
                this.connections.forEach(otherClient => {
                    otherClient.send(packet)
                })
                break;
            case "KickPlayer":
            case "RemovePlayer":
                this.connections.forEach(otherClient => {
                    otherClient.send(packet)
                })
                //TODO: NOT SENT TO PLAYER BEING REMOVED / KICK
                //TODOPRIORITY: CRITICAL
                break;
            case "GameData":
                  if (packet.RecipientClientID && packet.RecipientClientID === 2147483646n) {
                    if (!this.host) throw new Error('Could not find host for gameData packet')
                    connection.send({
                        type: 'RemovePlayer',
                        RoomCode: this.code,
                        PlayerClientID: 2147483646,
                        HostClientID: this.host.ID,
                        DisconnectReason: new DisconnectReason(new PolusBuffer(Buffer.from("00", 'hex')))
                    })
                    packet.Packets.forEach(packet => {
                        if (packet.type == GameDataPacketType.Spawn && Number(packet.SpawnID) == ObjectType.GameData && packet.Components[0].Data?.type == "GameData") {
                            let playerData = packet.Components[0].Data.players[0]
                            if (!this.host) {
                              throw new Error('Could not find host to set player on')
                            }
                            this.host.player = new Player(playerData)
                        }
                    })
                    if (!this.host.player) throw new Error("Data for host not recieved")
                    let joinRoomEvent = new JoinRoomEvent(this.host.player, this)
                    this.host.emit("joinRoom", joinRoomEvent)
                    this.emit("playerJoined", joinRoomEvent)
                    if (joinRoomEvent.isCanceled) {
                        this.host.disconnect()
                    }
                    break;
                }
                packet.Packets.forEach(GDPacket => {
                    if (GDPacket.type == GameDataPacketType.RPC) {
                        if (GDPacket.RPCFlag == RPCPacketType.UpdateGameData) {
                            // GDPacket.Packet.PlayerData
                        }
                    }
                    if (GDPacket.type == GameDataPacketType.Spawn) {
                        this.GameObjects.push(GDPacket)
                    }
                    if (GDPacket.type == GameDataPacketType.Data) {
                        let gthis = this;
                        this.GameObjects.forEach((gameObject, idx) => {
                            let oldcomp = gameObject.Components.findIndex(testcomp => testcomp.netID == (<DataPacket>GDPacket).Component.netID);
                            if (oldcomp != -1) {
                                gthis.GameObjects[idx].Components[oldcomp] = (<DataPacket>GDPacket).Component
                            }
                        })
                    }
                    if (GDPacket.type == GameDataPacketType.Despawn) {
                        let gthis = this;
                        this.GameObjects.forEach((gameObject, idx) => {
                            let cIdx = gameObject.Components.map(c => c.netID).indexOf(GDPacket.NetID)
                            if (cIdx != -1) {
                                gthis.GameObjects[idx].Components.splice(cIdx, 1)
                            }
                        })
                    }
                })
                if (packet.RecipientClientID) {
                    this.connections.filter(conn => BigInt(conn.ID) == packet.RecipientClientID).forEach(recipient => {
                        recipient.send(packet)
                    })

                    break;
                }
            default:
                this.connections.filter(conn => addr2str(conn.address) != addr2str(connection.address)).forEach(otherClient => {
                    otherClient.send(packet)
                })
                break;
        }
    }
    handleNewConnection(connection: Connection) {
        if (!this.host) connection.isHost = true;
        this.connections.forEach(conn => {
          conn.send({
            type: 'PlayerJoinedGame',
            RoomCode: this.code,
            PlayerClientID: connection.ID,
            HostClientID: this.host?.ID || -1
          })
        })
        this.connections.push(connection);
        connection.on('close', () => {
            this.connections.splice(this.connections.indexOf(connection), 1);
            if (connection.isHost && this.connections.length > 0) {
                this.connections[0].isHost = true;
            }
            this.connections.forEach(TSconnection => {
                TSconnection.startPacketGroup();
                TSconnection.send({
                    type: "RemovePlayer",
                    RoomCode: this.code,
                    PlayerClientID: connection.ID,
                    HostClientID: this.host?.ID || -1,
                    DisconnectReason: new DisconnectReason(0)
                })
                TSconnection.endPacketGroup();
            })
            if (this.connections.length === 0) {
                this.close()
            }
        })
    }
    public close(reason: string | number = 19) {
        let pb = new PolusBuffer()
        if (typeof reason == 'number') {
            pb.writeU8(reason)
        } else {
            pb.writeU8(0x08)
            pb.writeString(reason)
        }
        this.emit("close")
        this.connections.forEach(TSconnection => {
            TSconnection.send({
                type: "RemoveRoom",
                DisconnectReason: new DisconnectReason(pb)
            })
        })
    }
}
