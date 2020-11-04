import PolusBuffer from "../../../../util/PolusBuffer.js";

export interface SetNamePacket {
	Name: string
}

export default class SetName {

	parse(packet: PolusBuffer): SetNamePacket {
		return {Name: packet.readString()}
	}
	serialize(packet: SetNamePacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeString(packet.Name);
		return buf;
	};
};