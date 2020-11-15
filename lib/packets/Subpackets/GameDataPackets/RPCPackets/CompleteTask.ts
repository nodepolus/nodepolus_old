import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface CompleteTaskPacket {
	TaskIndex: number
}

export const CompleteTask: PacketHandler<CompleteTaskPacket> = {
	parse(packet: PolusBuffer): CompleteTaskPacket {
		return {
			TaskIndex: packet.readU8()
		};
  },

	serialize(packet: CompleteTaskPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.TaskIndex);
		return buf;
	}
}
