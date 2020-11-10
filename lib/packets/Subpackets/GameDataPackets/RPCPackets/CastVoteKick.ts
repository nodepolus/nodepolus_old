import PolusBuffer from "../../../../util/PolusBuffer";

export interface CastVoteKickPacket {
	PlayerClientID: number,
	SuspectClientID: number
}

export default class CastVoteKick {
	parse(packet: PolusBuffer): CastVoteKickPacket {
		return {
			PlayerClientID: packet.readU32(),
			SuspectClientID: packet.readU32()
		}
	}
	serialize(packet: CastVoteKickPacket): PolusBuffer {
		var buf = new PolusBuffer(2);
		buf.writeU32(packet.PlayerClientID);
		buf.writeU32(packet.SuspectClientID);
		return buf;
	};
};