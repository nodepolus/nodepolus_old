import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface EnterVentPacket {
	VentID: bigint
}

export const EnterVent: SubpacketClass<EnterVentPacket> = {
	parse(packet: PolusBuffer): EnterVentPacket {
		return {
			VentID: packet.readVarInt()
		}
  },

	serialize(packet: EnterVentPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.VentID);
		return buf;
	}
}
