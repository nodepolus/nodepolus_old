import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface SetColorPacket {
	Color: number
}

export const SetColor: SubpacketClass<SetColorPacket> = {
	parse(packet: PolusBuffer): SetColorPacket {
		return {Color: packet.readU8()}
  },

	serialize(packet: SetColorPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Color);
		return buf;
	}
}
