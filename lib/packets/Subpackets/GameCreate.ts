import PolusBuffer from '../../util/PolusBuffer'
import RoomSettings from '../PacketElements/RoomSettings'

export interface GameCreatePacket {
  type: 'GameCreate',
	RoomSettings: RoomSettings;
}

export default class GameCreate {
	parse(packet: PolusBuffer): GameCreatePacket {
		var rs = new RoomSettings();
		rs.parse(packet)
		const gameCreatePacket: GameCreatePacket = {
      type: 'GameCreate',
			RoomSettings: rs
		}
		return gameCreatePacket;
	}

	serialize(packet: GameCreatePacket): PolusBuffer {
		return packet.RoomSettings.serialize();
	};
}