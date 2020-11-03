import PolusBuffer from "../../util/PolusBuffer";
import RoomCode from "../PacketElements/RoomCode";

export interface AlterGamePacket {
    RoomCode: string,
    IsPublic: boolean
}

export default class AlterGame {
	parse(packet: PolusBuffer): AlterGamePacket {
		return {
			RoomCode: RoomCode.intToString(packet.read32()),
			IsPublic: packet.readBoolean()
		};
	}

	serialize(packet: AlterGamePacket): PolusBuffer {
		const buf = new PolusBuffer(5);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeBoolean(packet.IsPublic);
		return buf;
	}
};