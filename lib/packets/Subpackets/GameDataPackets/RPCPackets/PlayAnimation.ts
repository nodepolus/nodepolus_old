import PolusBuffer from "../../../../util/PolusBuffer";

export interface PlayAnimationPacket {
	Task: number
}

export default class PlayAnimation {

	parse(packet: PolusBuffer): PlayAnimationPacket {
		return {
			Task: packet.readU8()
		};
	}
	serialize(packet: PlayAnimationPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Task);
		return buf;
	};
};