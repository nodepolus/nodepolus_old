import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface ExitVentPacket {
	VentID: bigint
}

export const ExitVent: PacketHandler<ExitVentPacket> = {
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
