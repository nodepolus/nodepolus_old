import PolusBuffer from "../../../../util/PolusBuffer.js";

export interface VotingClosedPacket {}

export default class VotingClosed {

	parse(packet: PolusBuffer) {
		return {}
	}
	serialize(packet: VotingClosedPacket): PolusBuffer {
		return new PolusBuffer(0)
	};
};

