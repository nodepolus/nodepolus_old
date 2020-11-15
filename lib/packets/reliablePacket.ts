import { Unreliable, UnreliablePacket } from './unreliablePacket'
import PolusBuffer from '../util/polusBuffer'
import { PacketHandler, PacketHandlerOpts, ParsedPacket } from './packet'
import { Room } from '../util/room'

export interface ReliablePacket {
	Nonce: number,
	Data: UnreliablePacket
}

export const Reliable: PacketHandler<ReliablePacket | ParsedPacket> = {
	parse(packet: PolusBuffer, room: Room, opts: PacketHandlerOpts): ReliablePacket {
		return {
			Nonce: packet.readU16(true),
			Data: Unreliable.parse(packet, room, opts)
		};
  },

	serialize(packet: ParsedPacket | ReliablePacket, room: Room): PolusBuffer {
    var buf = new PolusBuffer();
    // if (!packet.Nonce) throw new Error('Tried to serialize a reliable packet that is missing a nonce')
    // @ts-ignore
    buf.writeU16(packet.Nonce, true);
    buf.writeBytes(Unreliable.serialize(packet.Data as UnreliablePacket, room))
		return buf;
	}
}

export default Reliable;
