import PolusBuffer from '../../../../util/PolusBuffer'

export interface VotingClosedPacket {}

export default class VotingClosed {

	parse(packet: PolusBuffer) {
		return {}
	}
	serialize(packet: VotingClosedPacket): PolusBuffer {
		return new PolusBuffer(0)
	};
};

