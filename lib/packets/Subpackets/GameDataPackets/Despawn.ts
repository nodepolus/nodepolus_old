import { SubpacketClass } from '..';
import PolusBuffer from '../../../util/PolusBuffer'
import { GameDataPacketType } from '../GameData'

export interface DespawnPacket {
  type: GameDataPacketType.Despawn,
	NetID: bigint
}

export const Despawn: SubpacketClass<DespawnPacket> = {
	parse(buffer: PolusBuffer): DespawnPacket {
		return {
      type: GameDataPacketType.Despawn,
			NetID: buffer.readVarInt()
		}
  },

	serialize(packet: DespawnPacket): PolusBuffer {
		var pb = new PolusBuffer();
		pb.writeVarInt(packet.NetID);
		return pb;
	}
}
