import PolusBuffer from "../../util/PolusBuffer";
import RoomSettings from "../PacketElements/RoomSettings";

export interface GameSearchPacket {
  type: 'GameSearch',
	RoomSettings: RoomSettings;
}

export class GameSearch {
	parse(packet: PolusBuffer): GameSearchPacket {
		var rs = new RoomSettings();
		rs.parse(packet)
		const gameCreatePacket: GameSearchPacket = {
      type: 'GameSearch',
			RoomSettings: rs
		}
		return gameCreatePacket;
	}

	serialize(packet: GameSearchPacket): PolusBuffer {
		return packet.RoomSettings.serialize();
	};
}