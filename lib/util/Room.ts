import Connection from "./Connection.js";
import Game from "./Game.js";
import Publicity from "../data/enums/publicity.js";
import { RoomSettings } from "../packets/PacketElements/RoomSettings.js";
import { EventEmitter } from "events";
import Player from "./Player.js";
import { SubPacket } from '../packets/Subpackets'
import Server from "../Server.js";
import { IGameObject } from "./GameObject.js";
import { GameDataPacket, GameDataPacketType } from "../packets/Subpackets/GameData.js";
// @ts-ignore
import randomstring from "randomstring";
import { addr2str } from "./misc.js";
import {inspect} from 'util';
import { RPCPacket } from "../packets/Subpackets/GameDataPackets/RPC.js";
import DisconnectReason from "../packets/PacketElements/DisconnectReason.js";
import PolusBuffer from "./PolusBuffer.js";
import { DataPacket } from "../packets/Subpackets/GameDataPackets/Data.js";

class Room extends EventEmitter {
    constructor(public server: Server) {
        super();
        this.internalCode = "KEKPOG"/*randomstring.generate({
            length: 6,
            charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        })*/
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
        this.syncSettings();
    };
    public GameObjects:IGameObject[] = [];
    game: Game;
    publicity: Publicity;
    server: Server;
    setCode(code:string) {
        this.code = code;
        //TODO: send update game code packet to clients
    }
    setPublicity(publicity:Publicity) {
        this.publicity = publicity;
        //TODO: send AlterGame packet to clients
    }
    syncSettings() {
        //TODO: send SyncSettings packet to clients
    }
    get host():Connection {
        return this.connections.find(con => con.player.isHost);
    }
    handlePacket(packet: SubPacket, connection: Connection) {
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
                      PlayerClientID: 2147483646n,
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
    }
}

export default Room;