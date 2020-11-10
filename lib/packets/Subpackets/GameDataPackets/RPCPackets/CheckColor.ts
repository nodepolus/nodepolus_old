import PolusBuffer from "../../../../util/PolusBuffer";

export interface CheckColorPacket {
	Color: number
}

export default class CheckColor {

	parse(packet: PolusBuffer): CheckColorPacket {
		return {Color: packet.readU8()}
	}
	serialize(packet: CheckColorPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Color);
		return buf;
	};
};