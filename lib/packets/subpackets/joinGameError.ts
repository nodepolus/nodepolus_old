import PolusBuffer from '../../util/polusBuffer'
import { Room } from '../../util/room'
import { PacketHandler } from '../packet'
import DisconnectReason from '../packetElements/disconnectReason'

export interface JoinGameErrorPacket {
  type: 'JoinGameError',
	DisconnectReason: DisconnectReason
}

export const JoinGameError: PacketHandler<JoinGameErrorPacket> = {
	parse(packet: PolusBuffer, room: Room): JoinGameErrorPacket {
		return {
      type: 'JoinGameError',
      DisconnectReason: new DisconnectReason(packet, room)
    }
	},

	serialize(packet: JoinGameErrorPacket): PolusBuffer {
		return packet.DisconnectReason.serialize();
	}
}
