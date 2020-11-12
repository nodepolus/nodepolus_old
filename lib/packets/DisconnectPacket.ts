import PolusBuffer from '../util/PolusBuffer'
import DisconnectReason from './PacketElements/DisconnectReason'
import { Room } from '../util/Room'

export interface DisconnectPacket {
	DisconnectReason: DisconnectReason
}

class Disconnect {
	parse(packet: PolusBuffer, room: Room): DisconnectPacket {
		return {DisconnectReason: new DisconnectReason(packet, room)};
	}
	serialize(packet: DisconnectPacket): PolusBuffer {
		return packet.DisconnectReason.serialize()
	}
}

export default Disconnect;