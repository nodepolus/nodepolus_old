import { Room } from "../util/room";
import { BaseCancelableEvent } from "./baseEvents";
import { Player } from "../util/player";

export class SendChatEvent extends BaseCancelableEvent {
  constructor(
    public player: Player,
    public room: Room,
    public message: string
  ) {
    super();
  }
}
