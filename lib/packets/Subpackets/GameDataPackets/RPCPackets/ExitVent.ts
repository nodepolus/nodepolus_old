import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface ExitVentPacket {
	VentID: bigint
}

export const ExitVent: SubpacketClass<ExitVentPacket> = {
	parse(packet: PolusBuffer): ExitVentPacket {
		return {
			VentID: packet.readVarInt()
		}
  },

	serialize(packet: ExitVentPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.VentID);
		return buf;
  }
}
