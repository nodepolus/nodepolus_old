import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface SetNamePacket {
	Name: string
}

export const SetName: SubpacketClass<SetNamePacket> = {
	parse(packet: PolusBuffer): SetNamePacket {
		return {Name: packet.readString()}
  },

	serialize(packet: SetNamePacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeString(packet.Name);
		return buf;
	}
}
