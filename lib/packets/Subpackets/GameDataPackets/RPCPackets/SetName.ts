import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface SetNamePacket {
	Name: string
}

export const SetName: PacketHandler<SetNamePacket> = {
	parse(packet: PolusBuffer): SetNamePacket {
		return {Name: packet.readString()}
  },

	serialize(packet: SetNamePacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeString(packet.Name);
		return buf;
	}
}
