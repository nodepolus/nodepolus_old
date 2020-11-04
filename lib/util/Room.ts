import Connection from "./Connection.js";
import Game from "./Game.js";
import Publicity from "../data/enums/publicity.js";
import { RoomSettings } from "../packets/PacketElements/RoomSettings.js";

class Room {
    public players: /*TODO: player array*/ any[];
    private connectionMap: Map<string, Connection>;
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
    }
    game: Game;
    publicity: Publicity
    constructor() {}
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
}

export default Room;