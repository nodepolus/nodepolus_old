import Unreliable, { UnreliablePacket } from './UnreliablePacket'
import PolusBuffer from '../../util/PolusBuffer'
import { ParsedPacket } from './Packet'

export interface ReliablePacket {
	Nonce: number,
	Data: UnreliablePacket
}

class Reliable {
	constructor() {}
	UnreliablePacketHandler = new Unreliable()
	parse(packet: PolusBuffer): ReliablePacket {
		return {
			Nonce: packet.readU16(true),
			Data: this.UnreliablePacketHandler.parse(packet)
		};
	}
	serialize(packet: ParsedPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU16(packet.Nonce, true);
		buf.writeBytes(this.UnreliablePacketHandler.serialize(<UnreliablePacket>packet.Data))
		return buf;
	}
}

export default Reliable;