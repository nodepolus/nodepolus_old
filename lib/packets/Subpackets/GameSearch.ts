import PolusBuffer from '../../util/PolusBuffer'
import { Room } from '../../util/Room'
import RoomSettings from '../PacketElements/RoomSettings'

export interface GameSearchPacket {
  type: 'GameSearch',
	RoomSettings: RoomSettings,
	IncludePrivate: boolean
}

export class GameSearch {
	parse(packet: PolusBuffer, room: Room): GameSearchPacket {
    var rs = new RoomSettings(room);
    let IncludePrivate = packet.readBoolean()
		rs.parse(packet)
		const gameCreatePacket: GameSearchPacket = {
      type: 'GameSearch',
			RoomSettings: rs,
			IncludePrivate
		}
		return gameCreatePacket;
	}

	serialize(packet: GameSearchPacket): PolusBuffer {
		let buf = new PolusBuffer();
		buf.writeBoolean(packet.IncludePrivate)
		let rs = packet.RoomSettings.serialize();
		buf.writeBytes(rs)
		return buf;
	};
}