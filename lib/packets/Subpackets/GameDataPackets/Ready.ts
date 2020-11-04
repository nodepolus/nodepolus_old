import PolusBuffer from "../../../util/PolusBuffer.js";

export interface ReadyPacket {
	ClientID: bigint
}

export default class Ready {

	parse(packet: PolusBuffer): ReadyPacket {
		return {
			ClientID: packet.readVarInt()
		}
	}
	serialize(packet: ReadyPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.ClientID);
		return buf;
	};
};