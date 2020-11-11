import { SubpacketClass } from '..';
import PolusBuffer from '../../../util/PolusBuffer'
import { GameDataPacketType } from '../GameData'

export interface ReadyPacket {
  type: GameDataPacketType.Ready,
	ClientID: bigint
}

export const Ready: SubpacketClass<ReadyPacket> = {
	parse(packet: PolusBuffer): ReadyPacket {
		return {
      type: GameDataPacketType.Ready,
			ClientID: packet.readVarInt()
		}
  },

	serialize(packet: ReadyPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.ClientID);
		return buf;
	}
}
