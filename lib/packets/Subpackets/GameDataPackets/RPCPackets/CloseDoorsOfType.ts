import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface CloseDoorsOfTypePacket {
	SystemType: number
}

export const CloseDoorsOfType: SubpacketClass<CloseDoorsOfTypePacket> = {
	parse(packet: PolusBuffer): CloseDoorsOfTypePacket {
		return {
			SystemType: packet.readU8()
		}
  },

	serialize(packet: CloseDoorsOfTypePacket): PolusBuffer {
		var buf = new PolusBuffer(2);
		buf.writeU8(packet.SystemType);
		return buf;
	}
}
