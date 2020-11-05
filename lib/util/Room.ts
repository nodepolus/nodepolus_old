import Connection from "./Connection.js";
import Game from "./Game.js";
import Publicity from "../data/enums/publicity.js";
import { RoomSettings } from "../packets/PacketElements/RoomSettings.js";
import { EventEmitter } from "events";
import Player from "./Player.js";
import { Packet as Subpacket } from "../packets/UnreliablePacket.js";
import Component from "../packets/PacketElements/Component.js";
import Server from "../Server.js";
import { IGameObject } from "./GameObject.js";
import { GameDataPacket, GameDataPacketType } from "../packets/Subpackets/GameData.js";
// @ts-ignore
import randomstring from "randomstring";
import { addr2str } from "./misc.js";
import {inspect} from 'util';
import { RPCPacket } from "../packets/Subpackets/GameDataPackets/RPC.js";

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
    handlePacket(packet: Subpacket, connection: Connection) {
        // @ts-ignore
        switch(packet.type) {
            case "GameData":
                (<GameDataPacket>packet).Packets.forEach(GDPacket => {
					// @ts-ignore
                    if(GDPacket.type == GameDataPacketType.Spawn) {
                        this.GameObjects.push(<IGameObject>GDPacket)
                    }
                })
            default:
                this.connections.filter(conn => addr2str(conn.address) != addr2str(connection.address)).forEach(otherClient => {
                    // @ts-ignore
                    otherClient.send(packet.type, packet)
                })
                break;
        }
    }
    handleNewConnection(connection: Connection) {
        if(!this.host) connection.player.isHost = true;
        this.connections.forEach(conn => {
            conn.send("PlayerJoinedGame", {
                RoomCode: this.code,
                PlayerClientID: connection.ID,
                HostClientID: this.host.ID
            })
        })
        this.connections.push(connection);
    }
}

export default Room;