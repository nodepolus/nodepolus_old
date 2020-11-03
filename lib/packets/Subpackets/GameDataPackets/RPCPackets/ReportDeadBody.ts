import PolusBuffer from "../../../../util/PolusBuffer";

export interface ReportDeadBodyPacket {
	PlayerID: number
}

export default class ReportDeadBody {

	parse(packet: PolusBuffer): ReportDeadBodyPacket {
		return {PlayerID: packet.readU8()}
	}
	serialize(packet: ReportDeadBodyPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.PlayerID);
		return buf;
	};
};