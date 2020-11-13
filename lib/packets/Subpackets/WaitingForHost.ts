import PolusBuffer from '../../util/PolusBuffer'
import { PacketHandler } from '../Packet';
import RoomCode from '../PacketElements/RoomCode'

export interface WaitingForHostPacket {
  type: 'WaitingForHost',
	RoomCode: string,
	WaitingClientID: number
}

export const WaitingForHost: PacketHandler<WaitingForHostPacket> = {
	parse(packet: PolusBuffer): WaitingForHostPacket {
		return {
      type: 'WaitingForHost',
			RoomCode: RoomCode.intToString(packet.read32()),
			WaitingClientID: packet.readU32()
		};
  },

	serialize(packet: WaitingForHostPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeU32(packet.WaitingClientID);
		return buf;
	}
}
