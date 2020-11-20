import { PolusBuffer } from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface ExiledPacket {}

export const Exiled: PacketHandler<ExiledPacket> = {
  parse(_: PolusBuffer): ExiledPacket {
    throw new Error("Recieved exiled packets, should not be used.");
  },

  serialize(_: ExiledPacket): PolusBuffer {
    throw new Error("Cannot serialize exiled packet, should not be used.");
  },
};
