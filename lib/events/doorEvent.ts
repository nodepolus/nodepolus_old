import { BaseEvent } from "./baseEvents";
import { Player } from "../util/player";
import { LevelRoom } from "../util/levelRoom";

export class DoorEvent extends BaseEvent {
  constructor(public player: Player, public room: LevelRoom, public door: Door) {
    super();
  }
}
