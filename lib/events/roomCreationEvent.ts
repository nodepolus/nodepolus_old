import { BaseCancelableEvent } from "./baseEvents";
import { Room } from "../util/room";

export default class RoomCreationEvent extends BaseCancelableEvent {
	constructor(public room: Room) { super() }
}