import PolusBuffer from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface CheckColorPacket {
  Color: number;
}

export const CheckColor: PacketHandler<CheckColorPacket> = {
  parse(packet: PolusBuffer): CheckColorPacket {
    return { Color: packet.readU8() };
  },

  serialize(packet: CheckColorPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeU8(packet.Color);
    return buf;
  },
};
