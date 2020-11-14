import PolusBuffer from '../../../../util/PolusBuffer'

export interface CastVotePacket {
	PlayerPlayerID: number,
	SuspectPlayerID: number
}

export default class CastVote {
	parse(packet: PolusBuffer): CastVotePacket {
		return {
			PlayerPlayerID: packet.readU8(),
			SuspectPlayerID: packet.read8()
		}
	}
	serialize(packet: CastVotePacket): PolusBuffer {
		var buf = new PolusBuffer(2);
		buf.writeU8(packet.PlayerPlayerID);
		buf.write8(packet.SuspectPlayerID);
		return buf;
	};
};