import { Connection } from "../util/connection";
import { BaseEvent } from "./baseEvents";
import { Player } from "../util/player";
import { MapRoom } from "../util/MapRooms";

export class PlayerEnteredRoomEvent extends BaseEvent {
  constructor(public player: Player, public room: MapRoom) {
    super();
  }
}
