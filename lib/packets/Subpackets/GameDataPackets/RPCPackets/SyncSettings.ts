import PolusBuffer from '../../../../util/PolusBuffer'
import { Room } from '../../../../util/Room'
import { PacketHandler } from '../../../Packet';
import RoomSettings from '../../../PacketElements/RoomSettings'

export interface SyncSettingsPacket {
	RoomSettings: RoomSettings
}

export const SyncSettings: PacketHandler<SyncSettingsPacket> = {
	parse(packet: PolusBuffer, room: Room): SyncSettingsPacket {
		let rs = new RoomSettings(room);
		rs.parse(packet)
		return {RoomSettings: rs}
  },

	serialize(packet: SyncSettingsPacket): PolusBuffer {
		return packet.RoomSettings.serialize();
	}
}
