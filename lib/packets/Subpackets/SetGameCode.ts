import RoomCode from "../PacketElements/RoomCode.js";
import PolusBuffer from "../../util/PolusBuffer.js";

export interface SetGameCodePacket {
  type: 'SetGameCode',
	RoomCode: string
}

export default class SetGameCode {
	parse(packet: PolusBuffer): SetGameCodePacket {
		return {
      type: 'SetGameCode',
      RoomCode: RoomCode.intToString(packet.read32())
		};
	}
	serialize(packet: SetGameCodePacket): PolusBuffer {
		var buf = new PolusBuffer(4);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		return buf;
	}
}