import PolusBuffer from "../../util/PolusBuffer.js";
import RoomCode from "../PacketElements/RoomCode.js";

export interface WaitingForHostPacket {
	RoomCode: string,
	WaitingClientID: number
}

export default class WaitingForHost {

	parse(packet: PolusBuffer): WaitingForHostPacket {
		return {
			RoomCode: RoomCode.intToString(packet.read32()),
			WaitingClientID: packet.readU32()
		};
	}
	serialize(packet: WaitingForHostPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeU32(packet.WaitingClientID);
		return buf;
	};
};