import PolusBuffer from '../../../../util/polusBuffer'
import { PacketHandler } from '../../../packet'
export interface VotingClosedPacket {}

export const VotingClosed: PacketHandler<VotingClosedPacket> = {
	parse(packet: PolusBuffer) {
		return {}
  },

	serialize(packet: VotingClosedPacket): PolusBuffer {
		return new PolusBuffer(0)
	}
}
