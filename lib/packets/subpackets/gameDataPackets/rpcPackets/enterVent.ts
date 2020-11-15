import PolusBuffer from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface EnterVentPacket {
  VentID: bigint;
}

export const EnterVent: PacketHandler<EnterVentPacket> = {
  parse(packet: PolusBuffer): EnterVentPacket {
    return {
      VentID: packet.readVarInt(),
    };
  },

  serialize(packet: EnterVentPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeVarInt(packet.VentID);
    return buf;
  },
};
