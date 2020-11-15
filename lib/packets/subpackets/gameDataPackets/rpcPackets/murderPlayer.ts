import PolusBuffer from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface MurderPlayerPacket {
  NetID: number;
}

export const MurderPlayer: PacketHandler<MurderPlayerPacket> = {
  parse(packet: PolusBuffer): MurderPlayerPacket {
    return { NetID: packet.readU8() };
  },

  serialize(packet: MurderPlayerPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeU8(packet.NetID);
    return buf;
  },
};
