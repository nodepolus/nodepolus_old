import PolusBuffer from "../../../../util/PolusBuffer";

export interface MurderPlayerPacket {
	NetID: number
}

export default class MurderPlayer {

	parse(packet: PolusBuffer): MurderPlayerPacket {
		return {NetID: packet.readU8()}
	}
	serialize(packet: MurderPlayerPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.NetID);
		return buf;
	};
};