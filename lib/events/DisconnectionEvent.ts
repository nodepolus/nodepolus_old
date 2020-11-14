import Connection from "../util/Connection";
import { BaseEvent } from "./BaseEvents";

export default class DisconnectionEvent extends BaseEvent {
	constructor(public connection: Connection) { super() }
}