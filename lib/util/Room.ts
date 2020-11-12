import { EventEmitter } from 'events'
import * as randomstring from 'randomstring'

import Connection from './Connection'
import Game from './Game'
import Publicity from '../data/enums/publicity'
import { RoomSettings } from '../packets/PacketElements/RoomSettings'
import { Packet as Subpacket } from '../packets/UnreliablePacket'
import Server from '../Server'
import { IGameObject } from './GameObject'
import { GameDataPacket, GameDataPacketType } from '../packets/Subpackets/GameData'

import { addr2str } from './misc'
import { RPCPacketType } from '../packets/Subpackets/GameDataPackets/RPC'
import DisconnectReason from '../packets/PacketElements/DisconnectReason'
import PolusBuffer from './PolusBuffer'
import { DataPacket } from '../packets/Subpackets/GameDataPackets/Data'
import { ObjectType } from '../packets/Subpackets/GameDataPackets/Spawn'

export declare interface Room {
  on(event: 'close', listener: Function): this
}

export class Room extends EventEmitter {
    constructor(public server: Server) {
        super();
        this.internalCode = randomstring.generate({
            length: 6,
            charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        })
    }
    public connections: Connection[] = [];
    private internalCode: string;
    public get code():string {
        return this.internalCode
    }
    public set code(input: string) {
        throw new Error("Use <Room>#setCode(<string>) to set the room code")
    }
    private internalSettings:RoomSettings = new RoomSettings();
    public get settings(): RoomSettings {
        return this.internalSettings
    };
    public set settings(input: RoomSettings) {
        this.internalSettings = <RoomSettings>input;
        this.internalSettings.room = this;
        this.syncSettings();
    };
    public GameObjects:IGameObject[] = [];
    game: Game;
    publicity: Publicity = Publicity.Private;
    server: Server;
    setCode(code:string) {
        this.code = code;
        this.connections.forEach(singleCon => {
            singleCon.send({
                type: "SetGameCode",
                RoomCode: this.code
            })
        })
    }
    setPublicity(publicity:Publicity) {
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
    syncSettings(NetIDIn?:bigint) {
        let NetID = 0n;
        let go = this.GameObjects.find(go => Number(go.SpawnID) == ObjectType.Player)
        if(go) {
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
    get host():Connection {
        return this.connections.find(con => con.player.isHost);
    }
    handlePacket(packet: Subpacket, connection: Connection) {
        switch(packet.type) {
            case "EndGame":
            case "StartGame":
                this.connections.forEach(otherClient => {
                    // @ts-ignore
                    otherClient.send(packet)
                })
                break;
            case "KickPlayer":
            case "RemovePlayer":
                this.connections.forEach(otherClient => {
                    // @ts-ignore
                    otherClient.send(packet)
                })
                //TODO: NOT SENT TO PLAYER BEING REMOVED / KICK
                //TODOPRIORITY: CRITICAL
                break;
            case "GameData":
                if (packet.RecipientClientID && packet.RecipientClientID === 2147483646n) {
                    connection.send({
                      type: 'RemovePlayer',
                      RoomCode: this.code,
                      PlayerClientID: 2147483646,
                      HostClientID: this.host.ID,
                      DisconnectReason: new DisconnectReason(new PolusBuffer(Buffer.from("00", 'hex')))
                    })
                    break;
                }
                if (packet.RecipientClientID) {
                    this.connections.filter(conn => BigInt(conn.ID) == packet.RecipientClientID).forEach(recipient => {
                        // @ts-ignore
                        recipient.send(packet)
                    })

                    break;
                }
                packet.Packets.forEach(GDPacket => {
                    //console.log(GDPacket)
                    // @ts-ignore
                    if(GDPacket.type == GameDataPacketType.Spawn) {
                        this.GameObjects.push(<IGameObject>GDPacket)
                    }
                    // @ts-ignore
                    if(GDPacket.type == GameDataPacketType.Data) {
                        let gthis = this;
                        this.GameObjects.forEach((gameObject, idx) => {
                            let oldcomp = gameObject.Components.findIndex(testcomp => testcomp.netID == (<DataPacket>GDPacket).Component.netID);
                            if(oldcomp != -1) {
                                gthis.GameObjects[idx].Components[oldcomp] = (<DataPacket>GDPacket).Component
                            }
                        })
                    }
                })
            default:
                this.connections.filter(conn => addr2str(conn.address) != addr2str(connection.address)).forEach(otherClient => {
                    // @ts-ignore
                    otherClient.send(packet)
                })
                break;
        }
    }
    handleNewConnection(connection: Connection) {
        if(!this.host) connection.player.isHost = true;
        this.connections.forEach(conn => {
          conn.send({
            type: 'PlayerJoinedGame',
            RoomCode: this.code,
            PlayerClientID: connection.ID,
            HostClientID: this.host.ID
          })
        })
        this.connections.push(connection);
        connection.on('close', () => {
            this.connections.splice(this.connections.indexOf(connection), 1);
            if(connection.player.isHost && this.connections.length > 0) {
                this.connections[0].player.isHost = true;
            }
            this.connections.forEach(TSconnection => {
                TSconnection.startPacketGroup();
                TSconnection.send({
                    type: "RemovePlayer",
                    RoomCode: this.code,
                    PlayerClientID: connection.ID,
                    HostClientID: this.host.ID,
                    DisconnectReason: new DisconnectReason(0)
                })
                TSconnection.endPacketGroup();
            })
            if(this.connections.length === 0) {
                this.close()
            }
        })
    }
    public close(reason:string|number = 19) {
        let pb = new PolusBuffer()
        if(typeof reason == 'number') {
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
