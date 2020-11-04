import PolusBuffer from "../../../util/PolusBuffer.js";

export interface DespawnPacket {
	NetID: bigint
}

export default class Despawn {
	constructor() { }
	parse(buffer: PolusBuffer): DespawnPacket {
		return {
			NetID: buffer.readVarInt()
		}
	}
	serialize(packet: DespawnPacket): PolusBuffer {
		var pb = new PolusBuffer();
		pb.writeVarInt(packet.NetID);
		return pb;
	};
};