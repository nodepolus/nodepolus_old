import PolusBuffer from '../util/PolusBuffer'
import { PacketHandler } from './Packet';

export interface AcknowledgementPacket {
	Nonce: number
}

export const Acknowledgement: PacketHandler<AcknowledgementPacket> = {
	parse(packet: PolusBuffer): AcknowledgementPacket {
		return {
			Nonce: packet.readU16(true)
		};
  },

	serialize(packet: AcknowledgementPacket): PolusBuffer {
		var buf = new PolusBuffer(3);
		buf.writeU16(packet.Nonce, true);
		buf.writeU8(0xFF);
		return buf;
	}
}
