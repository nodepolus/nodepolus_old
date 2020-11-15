import PolusBuffer from '../../../../util/polusBuffer'
import { PacketHandler } from '../../../packet'

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
