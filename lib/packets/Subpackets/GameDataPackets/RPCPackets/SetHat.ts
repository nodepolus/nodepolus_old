import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface SetHatPacket {
	Hat: number
}

export const SetHat: PacketHandler<SetHatPacket> = {
	parse(packet: PolusBuffer): SetHatPacket {
		return {Hat: packet.readU8()}
  },

	serialize(packet: SetHatPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Hat);
		return buf;
	}
}
