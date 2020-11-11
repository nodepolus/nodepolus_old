import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface CheckNamePacket {
	Name: string
}

export const CheckName: SubpacketClass<CheckNamePacket> = {
	parse(packet: PolusBuffer): CheckNamePacket {
		return {Name: packet.readString()}
  },

	serialize(packet: CheckNamePacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeString(packet.Name);
		return buf;
	}
}
