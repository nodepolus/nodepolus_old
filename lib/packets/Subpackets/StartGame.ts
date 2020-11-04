import RoomCode from "../PacketElements/RoomCode.js";
import PolusBuffer from "../../util/PolusBuffer.js";

export interface StartGamePacket {
	RoomCode: string
}

class StartGame {
	parse(packet: PolusBuffer): StartGamePacket {
		return {
			RoomCode: RoomCode.intToString(packet.read32())
		};
	}
	serialize(packet: StartGamePacket): PolusBuffer {
		var buf = new PolusBuffer(4);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		return buf;
	}
}

export default StartGame