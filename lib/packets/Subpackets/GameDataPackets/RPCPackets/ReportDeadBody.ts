import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface ReportDeadBodyPacket {
	PlayerID: number
}

export const ReportDeadBody: SubpacketClass<ReportDeadBodyPacket> = {
	parse(packet: PolusBuffer): ReportDeadBodyPacket {
		return {PlayerID: packet.readU8()}
  },

	serialize(packet: ReportDeadBodyPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.PlayerID);
		return buf;
	}
}
