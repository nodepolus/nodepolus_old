import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface ReportDeadBodyPacket {
	PlayerID: number
}

export const ReportDeadBody: PacketHandler<ReportDeadBodyPacket> = {
	parse(packet: PolusBuffer): ReportDeadBodyPacket {
		return {PlayerID: packet.readU8()}
  },

	serialize(packet: ReportDeadBodyPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.PlayerID);
		return buf;
	}
}
