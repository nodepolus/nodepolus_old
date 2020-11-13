import PolusBuffer from '../../../../util/PolusBuffer'
import { PacketHandler } from '../../../Packet';

export interface MurderPlayerPacket {
	NetID: number
}

export const MurderPlayer: PacketHandler<MurderPlayerPacket> = {
	parse(packet: PolusBuffer): MurderPlayerPacket {
		return {NetID: packet.readU8()}
  },

	serialize(packet: MurderPlayerPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.NetID);
		return buf;
	}
}
