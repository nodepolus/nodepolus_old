import Connection from "../util/Connection";
import { BaseCancelableEvent } from "./BaseEvents";

export default class ConnectionEvent extends BaseCancelableEvent {
	constructor(public connection:Connection) { super() }
}