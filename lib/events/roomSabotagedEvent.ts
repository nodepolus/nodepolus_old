import { BaseEvent } from "./baseEvents";
import { Player } from "../util/player";
import { MapRoom } from "../util/MapRooms";

export class RoomSabotagedEvent extends BaseEvent {
  constructor(public player: Player, public room: MapRoom) {
    super();
  }
}
