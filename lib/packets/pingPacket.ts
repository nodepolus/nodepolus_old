import PolusBuffer from "../util/polusBuffer";
import { PacketHandler } from "./packet";

export interface PingPacket {
  Nonce: number;
}

export const Ping: PacketHandler<PingPacket> = {
  parse(packet: PolusBuffer): PingPacket {
    return {
      Nonce: packet.readU16(true),
    };
  },
  serialize(packet: PingPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeU16(packet.Nonce, true);
    return buf;
  },
};
