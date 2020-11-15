import { Player } from "../util/player";
import { Room } from "../util/room";
import { BaseCancelableEvent } from "./baseEvents";

export default class JoinRoomEvent extends BaseCancelableEvent {
	constructor(public player: Player, public room: Room) { super() }
}
