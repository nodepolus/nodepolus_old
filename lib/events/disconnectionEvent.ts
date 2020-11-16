import Connection from "../util/connection";
import { BaseEvent } from "./baseEvents";

export class DisconnectionEvent extends BaseEvent {
  constructor(public connection: Connection) {
    super();
  }
}
