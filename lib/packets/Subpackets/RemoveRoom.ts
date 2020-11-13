import PolusBuffer from '../../util/PolusBuffer'
import { PacketHandler } from '../Packet';
import DisconnectReason from '../PacketElements/DisconnectReason'

export interface RemoveRoomPacket {
	type: 'RemoveRoom',
	DisconnectReason: DisconnectReason
}

export const RemoveRoom: PacketHandler<RemoveRoomPacket> = {
	parse(packet: PolusBuffer): RemoveRoomPacket {
		return {
			type: 'RemoveRoom',
			DisconnectReason: new DisconnectReason(packet)
		};
	},

	serialize(packet: RemoveRoomPacket): PolusBuffer {
		return packet.DisconnectReason.serialize();
	}
}
