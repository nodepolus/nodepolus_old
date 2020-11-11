import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface MurderPlayerPacket {
	NetID: number
}

export const MurderPlayer: SubpacketClass<MurderPlayerPacket> = {
	parse(packet: PolusBuffer): MurderPlayerPacket {
		return {NetID: packet.readU8()}
  },

	serialize(packet: MurderPlayerPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.NetID);
		return buf;
	}
}
