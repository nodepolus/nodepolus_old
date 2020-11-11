import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

import RoomSettings from '../../../PacketElements/RoomSettings'

export interface SyncSettingsPacket {
	RoomSettings: RoomSettings
}

export const SyncSettings: SubpacketClass<SyncSettingsPacket> = {
	parse(packet: PolusBuffer): SyncSettingsPacket {
		let rs = new RoomSettings();
		rs.parse(packet)
		return {RoomSettings: rs}
  },

	serialize(packet: SyncSettingsPacket): PolusBuffer {
		return packet.RoomSettings.serialize();
	}
}
