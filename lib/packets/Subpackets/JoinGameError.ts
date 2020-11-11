import PolusBuffer from '../../util/PolusBuffer'
import Room from '../../util/Room'
import DisconnectReason from '../PacketElements/DisconnectReason'
import { SubpacketClass } from '.'

export interface JoinGameErrorPacket {
  type: 'JoinGameError',
	DisconnectReason: DisconnectReason
}

export const JoinGameError: SubpacketClass<JoinGameErrorPacket> = {
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