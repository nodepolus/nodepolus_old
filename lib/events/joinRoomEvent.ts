import Player from "../util/Player";
import { Room } from "../util/Room";
import { BaseCancelableEvent } from "./BaseEvents";

export default class JoinRoomEvent extends BaseCancelableEvent {
	constructor(public player: Player, public room: Room) { super() }
}