import PolusBuffer from "../../../util/PolusBuffer.js";
import { GameDataPacketType } from "../GameData.js";

export interface ReadyPacket {
  type: GameDataPacketType.Ready,
	ClientID: bigint
}

export default class Ready {

	parse(packet: PolusBuffer): ReadyPacket {
		return {
      type: GameDataPacketType.Ready,
			ClientID: packet.readVarInt()
		}
	}
	serialize(packet: ReadyPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.ClientID);
		return buf;
	};
};