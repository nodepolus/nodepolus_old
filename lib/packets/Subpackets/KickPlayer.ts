import PolusBuffer from "../../util/PolusBuffer";

export interface KickPlayerPacket {
	ClientID: bigint,
	isBanned: boolean
}

export default class KickPlayer {

	parse(packet: PolusBuffer): KickPlayerPacket {
		return {
			ClientID: packet.readVarInt(),
			isBanned: packet.readBoolean()
		};
	}
	serialize(packet: KickPlayerPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.ClientID);
		buf.writeBoolean(packet.isBanned);
		return buf;
	};
};