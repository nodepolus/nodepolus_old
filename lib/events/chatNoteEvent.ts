import { BaseCancelableEvent } from "./baseEvents";
import { Player } from "../util/player";
import { ChatNoteType } from "../packets/subpackets/gameDataPackets/rpcPackets/sendChatNote";

export class ChatNoteEvent extends BaseCancelableEvent {
  constructor(public type: ChatNoteType, public player: Player) {
    super();
  }
}
