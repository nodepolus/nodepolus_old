import { JoinRoomEvent, RoomCreationEvent } from "../../lib/events";
import { BasePlugin } from "../../lib/util/BasePlugin";
import { Plugin } from "../../lib/util/Plugin";
import { Room } from "../../lib/util/room";

export default class ExamplePlugin extends BasePlugin implements Plugin {
    public name = "Example"
    public author = "YourName"
    public version = "1.0.0"

    onEnable() {
        //Register events we want to listen to
        this._eventManager?.registerEvent('playerJoined', this.onPlayerJoined)
        this._eventManager?.registerEvent('roomCreated', this.onRoomCreated)
    }

    onDisable() {

    }

    onPlayerJoined(e: JoinRoomEvent, room: Room) { //Room bound events have the room the event was called on as second param
        console.log(e.player.name + ' joined room with code ' + room.code)
    }

    onRoomCreated(e: RoomCreationEvent) { //Server bound events only have the event (1 param)
        console.log('Created a room with the code ' + e.room.code)
    }
}