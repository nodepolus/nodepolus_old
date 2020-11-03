import PolusBuffer from "../../util/PolusBuffer";
import Room from "../../util/Room";
import RoomSettings from "../PacketElements/RoomSettings";

export interface GameCreatePacket {
	RoomSettings: RoomSettings;
}

export default class GameCreate {
	parse(packet: PolusBuffer): GameCreatePacket {
		var rs = new RoomSettings();
		rs.parse(packet)
		const gameCreatePacket: GameCreatePacket = {
			RoomSettings: rs
		}
		return gameCreatePacket;
	}

	serialize(packet: GameCreatePacket): PolusBuffer {
		return packet.RoomSettings.serialize();
	};
}