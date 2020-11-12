import PolusBuffer from '../../../../util/PolusBuffer'
import { Room } from '../../../../util/Room'
import RoomSettings from '../../../PacketElements/RoomSettings'

export interface SyncSettingsPacket {
	RoomSettings: RoomSettings
}

export default class SyncSettings {

	parse(packet: PolusBuffer, room: Room): SyncSettingsPacket {
		let rs = new RoomSettings(room);
		rs.parse(packet)
		return {RoomSettings: rs}
	}
	serialize(packet: SyncSettingsPacket): PolusBuffer {
		return packet.RoomSettings.serialize();
	};
};
