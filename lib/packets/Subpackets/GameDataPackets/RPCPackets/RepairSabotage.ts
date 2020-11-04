import PolusBuffer from "../../../../util/PolusBuffer.js";

export interface RepairSabotagePacket {
	PlayerPlayerID: number,
	SuspectPlayerID: number
}

export default class RepairSabotage {
	parse(packet: PolusBuffer): RepairSabotagePacket {
		return {
			PlayerPlayerID: packet.readU8(),
			SuspectPlayerID: packet.read8()
		}
	}
	serialize(packet: RepairSabotagePacket): PolusBuffer {
		var buf = new PolusBuffer(2);
		buf.writeU8(packet.PlayerPlayerID);
		buf.write8(packet.SuspectPlayerID);
		return buf;
	};
};