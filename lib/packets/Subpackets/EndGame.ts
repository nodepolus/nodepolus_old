import RoomCode from "../PacketElements/RoomCode";
import PolusBuffer from "../../util/PolusBuffer";
import DisconnectReason from "../PacketElements/DisconnectReason";
import Room from "../../util/Room";

export interface EndGamePacket {
	RoomCode: string,
	EndReason: DisconnectReason,
	ShowAdvert: boolean
}

export class EndGame {
	constructor(private room: Room) {}
	parse(packet: PolusBuffer): EndGamePacket {
		return {
			RoomCode: RoomCode.intToString(packet.read32()),
			EndReason: new DisconnectReason(new PolusBuffer(packet.readU8()), this.room),
			ShowAdvert: packet.readBoolean()
		};
	}
	serialize(packet: EndGamePacket): PolusBuffer {
		const buf = new PolusBuffer(6);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeU8(packet.EndReason.reasonInt);
		buf.writeBoolean(packet.ShowAdvert);
		return buf;
	};
}