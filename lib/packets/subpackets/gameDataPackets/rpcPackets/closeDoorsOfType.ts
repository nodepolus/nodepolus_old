import { PolusBuffer } from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface CloseDoorsOfTypePacket {
  SystemType: number;
}

export const CloseDoorsOfType: PacketHandler<CloseDoorsOfTypePacket> = {
  parse(packet: PolusBuffer): CloseDoorsOfTypePacket {
    return {
      SystemType: packet.readU8(),
    };
  },

  serialize(packet: CloseDoorsOfTypePacket): PolusBuffer {
    var buf = new PolusBuffer(2);
    buf.writeU8(packet.SystemType);
    return buf;
  },
};
