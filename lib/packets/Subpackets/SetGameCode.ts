import RoomCode from '../PacketElements/RoomCode'
import PolusBuffer from '../../util/PolusBuffer'
import { PacketHandler } from '../Packet';

export interface SetGameCodePacket {
  type: 'SetGameCode',
	RoomCode: string
}

export const SetGameCode: PacketHandler<SetGameCodePacket> = {
	parse(packet: PolusBuffer): SetGameCodePacket {
		return {
      type: 'SetGameCode',
      RoomCode: RoomCode.intToString(packet.read32())
		};
  },

	serialize(packet: SetGameCodePacket): PolusBuffer {
		var buf = new PolusBuffer(4);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		return buf;
	}
}
