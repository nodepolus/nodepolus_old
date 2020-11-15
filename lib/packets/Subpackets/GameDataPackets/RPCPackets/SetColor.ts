import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface SetColorPacket {
	Color: number
}

export const SetColor: PacketHandler<SetColorPacket> = {
	parse(packet: PolusBuffer): SetColorPacket {
		return {Color: packet.readU8()}
  },

	serialize(packet: SetColorPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Color);
		return buf;
  }
}
