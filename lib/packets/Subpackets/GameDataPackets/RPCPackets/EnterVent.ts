import PolusBuffer from "../../../../util/PolusBuffer";

export interface EnterVentPacket {
	VentID: bigint
}

export default class EnterVent {

	parse(packet: PolusBuffer): EnterVentPacket {
		return {
			VentID: packet.readVarInt()
		}
	}
	serialize(packet: EnterVentPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.VentID);
		return buf;
	};
};

