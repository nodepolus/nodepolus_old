import { BaseCancelableEvent } from "./BaseEvents";
import Connection from "../util/Connection";

export default class JoinRoomRequestEvent extends BaseCancelableEvent {
	constructor(public RoomCode: string, public Connection: Connection) { super() }
}