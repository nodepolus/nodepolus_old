import PolusBuffer from '../util/PolusBuffer'
import DisconnectReason from './PacketElements/DisconnectReason'
import { Room } from '../util/Room'
import { PacketHandler } from './Packet';

export interface DisconnectPacket {
	DisconnectReason: DisconnectReason
}

export const Disconnect: PacketHandler<DisconnectPacket> = {
	parse(packet: PolusBuffer, room: Room): DisconnectPacket {
		return {DisconnectReason: new DisconnectReason(packet, room)};
  },

	serialize(packet: DisconnectPacket): PolusBuffer {
		return packet.DisconnectReason.serialize()
	}
}
