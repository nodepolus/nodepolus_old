import { PolusBuffer } from "../../../util/polusBuffer";
import { PacketHandler } from "../../packet";
import { GameDataPacketType } from "../gameData";

export interface SceneChangePacket {
  type: GameDataPacketType.SceneChange;
  ClientID: bigint;
  Scene: string;
}

export const SceneChange: PacketHandler<SceneChangePacket> = {
  parse(packet: PolusBuffer): SceneChangePacket {
    return {
      type: GameDataPacketType.SceneChange,
      ClientID: packet.readVarInt(),
      Scene: packet.readString(),
    };
  },

  serialize(packet: SceneChangePacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeVarInt(packet.ClientID);
    buf.writeString(packet.Scene);
    return buf;
  },
};
