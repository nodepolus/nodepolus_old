import PolusBuffer from '../../../util/polusBuffer'
import { PacketHandler } from '../../packet';
import { GameDataPacketType } from '../gameData'

export interface DespawnPacket {
  type: GameDataPacketType.Despawn,
	NetID: bigint
}

export const Despawn: PacketHandler<DespawnPacket> = {
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
