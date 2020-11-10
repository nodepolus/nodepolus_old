import PolusBuffer from "../../../util/PolusBuffer";
import { GameDataPacketType } from "../GameData";

export interface DespawnPacket {
  type: GameDataPacketType.Despawn,
	NetID: bigint
}

export default class Despawn {
	constructor() { }
	parse(buffer: PolusBuffer): DespawnPacket {
		return {
      type: GameDataPacketType.Despawn,
			NetID: buffer.readVarInt()
		}
	}
	serialize(packet: DespawnPacket): PolusBuffer {
		var pb = new PolusBuffer();
		pb.writeVarInt(packet.NetID);
		return pb;
	};
};