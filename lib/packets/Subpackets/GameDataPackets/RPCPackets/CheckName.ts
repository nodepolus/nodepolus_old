import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface CheckNamePacket {
	Name: string
}

export const CheckName: PacketHandler<CheckNamePacket> = {
	parse(packet: PolusBuffer): CheckNamePacket {
		return {Name: packet.readString()}
  },

	serialize(packet: CheckNamePacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeString(packet.Name);
		return buf;
  }
}
