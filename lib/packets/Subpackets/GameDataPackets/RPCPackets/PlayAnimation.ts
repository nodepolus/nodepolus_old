import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface PlayAnimationPacket {
	Task: number
}

export const PlayAnimation: PacketHandler<PlayAnimationPacket> = {
	parse(packet: PolusBuffer): PlayAnimationPacket {
		return {
			Task: packet.readU8()
		};
  },

	serialize(packet: PlayAnimationPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Task);
		return buf;
	}
}
