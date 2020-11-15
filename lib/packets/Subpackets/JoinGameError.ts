import PolusBuffer from '../../util/PolusBuffer'
import { Room } from '../../util/Room'
import DisconnectReason from '../PacketElements/DisconnectReason'

export interface JoinGameErrorPacket {
  type: 'JoinGameError',
	DisconnectReason: DisconnectReason
}

export default class JoinGameError {
	constructor(private room: Room) {}

	parse(packet: PolusBuffer): JoinGameErrorPacket {
		return {
      type: 'JoinGameError',
      DisconnectReason: new DisconnectReason(packet, this.room)
    }
	}

	serialize(packet: JoinGameErrorPacket): PolusBuffer {
		return packet.DisconnectReason.serialize();
	}
}