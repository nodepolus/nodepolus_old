import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface CastVoteKickPacket {
	PlayerClientID: number,
	SuspectClientID: number
}

export const CastVoteKick: PacketHandler<CastVoteKickPacket> = {
	parse(packet: PolusBuffer): CastVoteKickPacket {
		return {
			PlayerClientID: packet.readU32(),
			SuspectClientID: packet.readU32()
		}
  },

	serialize(packet: CastVoteKickPacket): PolusBuffer {
		var buf = new PolusBuffer(8);
		buf.writeU32(packet.PlayerClientID);
		buf.writeU32(packet.SuspectClientID);
		return buf;
	}
}
