import { BaseCancelableEvent } from "./baseEvents";
import { Room } from "../util/room";

export class RoomCreationEvent extends BaseCancelableEvent {
  constructor(public room: Room) {
    super();
  }
}
