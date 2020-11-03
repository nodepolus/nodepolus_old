import PolusBuffer from "../../../../util/PolusBuffer";

export interface ExitVentPacket {
	VentID: bigint
}

export default class ExitVent {

	parse(packet: PolusBuffer): ExitVentPacket {
		return {
			VentID: packet.readVarInt()
		}
	}
	serialize(packet: ExitVentPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.VentID);
		return buf;
	};
};

