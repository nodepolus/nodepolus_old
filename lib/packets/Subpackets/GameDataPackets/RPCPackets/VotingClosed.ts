import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface VotingClosedPacket {}

export const VotingClosed: SubpacketClass<VotingClosedPacket> = {
	parse(packet: PolusBuffer) {
		return {}
  },

	serialize(packet: VotingClosedPacket): PolusBuffer {
		return new PolusBuffer(0)
	}
}
