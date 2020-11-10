import PolusBuffer from "../../../../util/PolusBuffer";

export interface CheckNamePacket {
	Name: string
}

export default class CheckName {

	parse(packet: PolusBuffer): CheckNamePacket {
		return {Name: packet.readString()}
	}
	serialize(packet: CheckNamePacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeString(packet.Name);
		return buf;
	};
};