import PolusBuffer from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface SetSkinPacket {
  Skin: number;
}

export const SetSkin: PacketHandler<SetSkinPacket> = {
  parse(packet: PolusBuffer): SetSkinPacket {
    return { Skin: packet.readU8() };
  },

  serialize(packet: SetSkinPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeU8(packet.Skin);
    return buf;
  },
};
