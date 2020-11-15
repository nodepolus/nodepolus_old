import { Unreliable, UnreliablePacket } from './UnreliablePacket'
import PolusBuffer from '../../util/PolusBuffer'
import { ParsedPacket } from './Packet'
import { PacketHandler } from '../../packets/Packet'
import { Room } from '../../util/Room'

export interface ReliablePacket {
	Nonce: number,
	Data: UnreliablePacket
}

export const Reliable: PacketHandler<ReliablePacket | ParsedPacket> = {
	parse(packet: PolusBuffer, room: Room): ReliablePacket {
		return {
      Nonce: packet.readU16(true),
      Data: Unreliable.parse(packet, room)
		};
  },

	serialize(packet: ParsedPacket, room: Room): PolusBuffer {
    var buf = new PolusBuffer();
    // @ts-ignore
		buf.writeU16(packet.Nonce, true);
		buf.writeBytes(Unreliable.serialize(packet.Data as UnreliablePacket, room))
		return buf;
	}
}
