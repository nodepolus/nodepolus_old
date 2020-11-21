import { PacketHandler } from "../../packets/packet";
import { PolusBuffer } from "../../util/polusBuffer";

export interface DisconnectPacket {}

export const Disconnect: PacketHandler<DisconnectPacket> = {
  parse(packet: PolusBuffer): DisconnectPacket {
    return {};
  },

  serialize(packet: DisconnectPacket): PolusBuffer {
    return new PolusBuffer();
  },
};
