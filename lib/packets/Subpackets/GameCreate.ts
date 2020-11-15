import PolusBuffer from '../../util/PolusBuffer'
import { Room } from '../../util/Room'
import { PacketHandler } from '../Packet';
import RoomSettings from '../PacketElements/RoomSettings'

export interface GameCreatePacket {
  type: 'GameCreate',
	RoomSettings: RoomSettings;
}

export const GameCreate: PacketHandler<GameCreatePacket> = {
	parse(packet: PolusBuffer, room: Room): GameCreatePacket {
		var rs = new RoomSettings(room);
		rs.parse(packet)
		const gameCreatePacket: GameCreatePacket = {
      type: 'GameCreate',
			RoomSettings: rs
		}
		return gameCreatePacket;
	},

	serialize(packet: GameCreatePacket): PolusBuffer {
		return packet.RoomSettings.serialize();
	}
}
