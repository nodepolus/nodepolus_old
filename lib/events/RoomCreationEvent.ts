import { BaseCancelableEvent } from "./BaseEvents";
import { Room } from "../util/Room";

export default class RoomCreationEvent extends BaseCancelableEvent {
	constructor(public room: Room) { super() }
}