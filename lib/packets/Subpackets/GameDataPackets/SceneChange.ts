import PolusBuffer from "../../../util/PolusBuffer.js";

export interface SceneChangePacket {
  type: 'SceneChange',
	ClientID: bigint,
	Scene: string
}

export default class SceneChange {
	parse(packet: PolusBuffer): SceneChangePacket {
		return {
      type: 'SceneChange',
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