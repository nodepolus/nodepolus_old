import { BaseEvent } from "./baseEvents";
import { Player } from "../util/player";
import { LevelRoom } from "../util/levelRoom";

export class PlayerMovedRoomEvent extends BaseEvent {
  constructor(public player: Player, public room: LevelRoom) {
    super();
  }
}
