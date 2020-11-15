import { BaseCancelableEvent } from "./baseEvents";
import RoomSettings from "../packets/packetElements/roomSettings";
import { RoomListing } from "../packets/subpackets/gameSearchResults";

export default class RoomListingRequestEvent extends BaseCancelableEvent {
  constructor(
    public request: {
      includePrivate: boolean;
      filter: RoomSettings;
    },
    public response: {
      SkeldRoomCount: number;
      MiraHQRoomCount: number;
      PolusRoomCount: number;
      Rooms: RoomListing[];
    }
  ) {
    super();
  }
}
