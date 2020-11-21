import { Connection } from "../util/connection";
import { BaseCancelableEvent } from "./baseEvents";

export class ConnectionEvent extends BaseCancelableEvent {
  constructor(public connection: Connection) {
    super();
  }
}
