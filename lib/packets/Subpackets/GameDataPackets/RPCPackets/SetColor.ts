import PolusBuffer from "../../../../util/PolusBuffer.js";

export interface SetColorPacket {
	Color: number
}

export default class SetColor {

	parse(packet: PolusBuffer): SetColorPacket {
		return {Color: packet.readU8()}
	}
	serialize(packet: SetColorPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Color);
		return buf;
	};
};