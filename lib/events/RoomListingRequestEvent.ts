import { BaseCancelableEvent } from "./BaseEvents";
import RoomSettings from "../packets/PacketElements/RoomSettings";
import { RoomListing } from "../packets/Subpackets/GameSearchResults";

export default class RoomListingRequestEvent extends BaseCancelableEvent {
	constructor(public request: {
		includePrivate: boolean,
		filter: RoomSettings
	}, public response: {
		SkeldRoomCount: number,
		MiraHQRoomCount: number,
		PolusRoomCount: number,
		Rooms: RoomListing[]
	}) { super() }
}