import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface CheckColorPacket {
	Color: number
}

export const CheckColor: SubpacketClass<CheckColorPacket> = {
	parse(packet: PolusBuffer): CheckColorPacket {
		return {Color: packet.readU8()}
  },

	serialize(packet: CheckColorPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Color);
		return buf;
	}
}
