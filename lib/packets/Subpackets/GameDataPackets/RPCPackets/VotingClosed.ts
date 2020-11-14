import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet'

export interface VotingClosedPacket {}

export const VotingClosed: PacketHandler<VotingClosedPacket> = {
	parse(packet: PolusBuffer) {
		return {}
  },

	serialize(packet: VotingClosedPacket): PolusBuffer {
		return new PolusBuffer(0)
	}
}
