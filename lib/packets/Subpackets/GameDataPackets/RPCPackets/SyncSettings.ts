import PolusBuffer from "../../../../util/PolusBuffer.js";
import RoomSettings from "../../../PacketElements/RoomSettings.js";

export interface SyncSettingsPacket {
	RoomSettings: RoomSettings
}

export default class SyncSettings {

	parse(packet: PolusBuffer): SyncSettingsPacket {
		let rs = new RoomSettings();
		rs.parse(packet)
		return {RoomSettings: rs}
	}
	serialize(packet: SyncSettingsPacket): PolusBuffer {
		return packet.RoomSettings.serialize();
	};
};