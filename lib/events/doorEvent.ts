import { BaseEvent } from "./baseEvents";
import { Player } from "../util/player";
<<<<<<< HEAD
import { MapRoom } from "../util/MapRooms";
=======
import { MapRoom, Door } from "../util/MapRooms";
>>>>>>> Continuing work on mapdata

export class DoorEvent extends BaseEvent {
  constructor(public player: Player, public room: MapRoom, public door: Door) {
    super();
  }
}
