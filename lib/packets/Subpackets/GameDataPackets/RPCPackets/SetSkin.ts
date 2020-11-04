import PolusBuffer from "../../../../util/PolusBuffer.js";

export interface SetSkinPacket {
	Skin: number
}

export default class SetSkin {

	parse(packet: PolusBuffer): SetSkinPacket {
		return {Skin: packet.readU8()}
	}
	serialize(packet: SetSkinPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Skin);
		return buf;
	};
};