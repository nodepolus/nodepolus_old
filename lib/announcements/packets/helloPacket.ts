import { PacketHandler } from "../../packets/packet";
import PolusBuffer from "../../util/polusBuffer";

export interface HelloPacketData {
  HazelVersion: number;
  ClientVersion: bigint;
  LastAnnouncement: bigint;
  Language: bigint;
}

export interface HelloPacket {
  Nonce: number;
  Data: HelloPacketData;
}

export const Hello: PacketHandler<HelloPacket> = {
  parse(packet: PolusBuffer): HelloPacket {
    return {
      Nonce: packet.readU16(true),
      Data: {
        HazelVersion: packet.readU8(),
        ClientVersion: packet.readVarInt(),
        LastAnnouncement: packet.readVarInt(),
        Language: packet.readVarInt(),
      },
    };
  },

  serialize(packet: HelloPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeU16(packet.Nonce, true);
    buf.writeU8(packet.Data.HazelVersion);
    buf.writeVarInt(packet.Data.ClientVersion);
    buf.writeVarInt(packet.Data.LastAnnouncement);
    buf.writeVarInt(packet.Data.Language);
    return buf;
  },
};
