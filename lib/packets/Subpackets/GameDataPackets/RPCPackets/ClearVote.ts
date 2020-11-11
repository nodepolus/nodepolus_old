import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface ClearVotePacket {}

export const ClearVote: SubpacketClass<ClearVotePacket> = {
	parse(packet: PolusBuffer): ClearVotePacket {
		return {}
  },

	serialize(packet: ClearVotePacket): PolusBuffer {
		return new PolusBuffer(0);
	}
}
