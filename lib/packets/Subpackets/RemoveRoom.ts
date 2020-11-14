import PolusBuffer from '../../util/PolusBuffer'
import DisconnectReason from '../PacketElements/DisconnectReason'

export interface RemoveRoomPacket {
	type: 'RemoveRoom',
	DisconnectReason: DisconnectReason
}

export default class RemoveRoom {
	parse(packet: PolusBuffer): RemoveRoomPacket {
		return {
			type: 'RemoveRoom',
			DisconnectReason: new DisconnectReason(packet)
		};
	}

	serialize(packet: RemoveRoomPacket): PolusBuffer {
		return packet.DisconnectReason.serialize();
	}
}