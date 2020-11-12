import Unreliable, { UnreliablePacket } from './UnreliablePacket'
import PolusBuffer from '../util/PolusBuffer'
import { ParsedPacket } from './Packet'
import { Room } from '../util/Room'

export interface ReliablePacket {
	Nonce: number,
	Data: UnreliablePacket
}

class Reliable {
	UnreliablePacketHandler = new Unreliable()
	parse(packet: PolusBuffer, room: Room, toServer: boolean): ReliablePacket {
		return {
			Nonce: packet.readU16(true),
			Data: this.UnreliablePacketHandler.parse(packet, room, toServer)
		};
	}
	serialize(packet: ParsedPacket): PolusBuffer {
    var buf = new PolusBuffer();
    // if (!packet.Nonce) throw new Error('Tried to serialize a reliable packet that is missing a nonce')
    // @ts-ignore
		buf.writeU16(packet.Nonce, true);
		//@ts-ignore
		buf.writeBytes(this.UnreliablePacketHandler.serialize(packet.Data))
		return buf;
	}
}

export default Reliable;
