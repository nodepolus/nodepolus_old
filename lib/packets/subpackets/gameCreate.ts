import PolusBuffer from '../../util/polusBuffer'
import { Room } from '../../util/room'
import { PacketHandler } from '../packet';
import RoomSettings from '../packetElements/roomSettings'

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
