import PolusBuffer from "../../../../util/PolusBuffer.js";

export interface SetStartCounterPacket {
	SequenceNumber: bigint,
	Time: number
}

export default class SetStartCounter {

	parse(packet: PolusBuffer): SetStartCounterPacket {
		return {
			SequenceNumber: packet.readVarInt(),
			Time: packet.read8()
		}
	}
	serialize(packet: SetStartCounterPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.SequenceNumber);
		buf.write8(packet.Time)
		return buf;
	};
};

