import { BaseCancelableEvent } from "./baseEvents";
import { Player } from "../util/player";

export class ChatEvent extends BaseCancelableEvent {
  constructor(public message: string, public player: Player) {
    super();
  }
}
