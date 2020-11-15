import RoomCode from '../PacketElements/RoomCode'
import PolusBuffer from '../../util/PolusBuffer'
import { PacketHandler } from '../Packet';

export interface StartGamePacket {
  type: 'StartGame',
	RoomCode: string
}

export const StartGame: PacketHandler<StartGamePacket> = {
	parse(packet: PolusBuffer): StartGamePacket {
		return {
      type: 'StartGame',
			RoomCode: RoomCode.intToString(packet.read32())
		};
  },

	serialize(packet: StartGamePacket): PolusBuffer {
		var buf = new PolusBuffer(4);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		return buf;
	}
}
