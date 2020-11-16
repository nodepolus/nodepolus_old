import { Room } from "../util/room";
import { BaseCancelableEvent } from "./baseEvents";
import { Player } from "../util/player";

export default class JoinRoomEvent extends BaseCancelableEvent {
  constructor(public player: Player, public room: Room) {
    super();
  }
}
