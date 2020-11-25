import { PolusBuffer } from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface ExitVentPacket {
  VentID: number;
}

export const ExitVent: PacketHandler<ExitVentPacket> = {
  parse(packet: PolusBuffer): ExitVentPacket {
    return {
      VentID: packet.readVarInt(),
    };
  },

  serialize(packet: ExitVentPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeVarInt(packet.VentID);
    return buf;
  },
};
