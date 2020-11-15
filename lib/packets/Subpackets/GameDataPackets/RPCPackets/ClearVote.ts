import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface ClearVotePacket { }

export const ClearVote: PacketHandler<ClearVotePacket> = {
	parse(packet: PolusBuffer): ClearVotePacket {
		return {}
  },

	serialize(packet: ClearVotePacket): PolusBuffer {
		return new PolusBuffer(0);
	}
}
