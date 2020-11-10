import PolusBuffer from "../../../util/PolusBuffer";
import { GameDataPacketType } from "../GameData";

export interface SceneChangePacket {
  type: GameDataPacketType.SceneChange,
	ClientID: bigint,
	Scene: string
}

export default class SceneChange {
	parse(packet: PolusBuffer): SceneChangePacket {
		return {
      type: GameDataPacketType.SceneChange,
			ClientID: packet.readVarInt(),
			Scene: packet.readString()
		}
	}
	serialize(packet: SceneChangePacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.ClientID);
		buf.writeString(packet.Scene);
		return buf;
	};
};