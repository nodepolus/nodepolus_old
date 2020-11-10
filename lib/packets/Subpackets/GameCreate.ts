import { SubpacketClass, SubPacketType } from './subpacket'

import PolusBuffer from '../../util/PolusBuffer'
import RoomSettings from '../PacketElements/RoomSettings'

export interface GameCreatePacket {
  type: SubPacketType.GameCreate,
	RoomSettings: RoomSettings;
}

export const GameCreate: SubpacketClass<GameCreatePacket> = {
  parse(packet: PolusBuffer): GameCreatePacket {
		var rs = new RoomSettings();
		rs.parse(packet)
		const gameCreatePacket: GameCreatePacket = {
      type: SubPacketType.GameCreate,
			RoomSettings: rs
		}
		return gameCreatePacket;
	},

	serialize(packet: GameCreatePacket): PolusBuffer {
		return packet.RoomSettings.serialize();
	}
}
