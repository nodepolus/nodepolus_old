import { BaseCancelableEvent } from "./baseEvents";
import { Connection } from "../util/connection";

export class JoinRoomRequestEvent extends BaseCancelableEvent {
  constructor(public RoomCode: string, public Connection: Connection) {
    super();
  }
}
