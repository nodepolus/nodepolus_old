import { PolusBuffer } from "../util/polusBuffer";
import { PacketHandler } from "./packet";
import { ClientVersion } from "./packetElements/clientVersion";

export interface HelloPacketData {
  HazelVersion: number;
  ClientVersion: ClientVersion;
  Name: string;
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
        ClientVersion: ClientVersion.parse(packet.read32()),
        Name: packet.readString(),
      },
    };
  },

  serialize(packet: HelloPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeU16(packet.Nonce, true);
    buf.writeU8(packet.Data.HazelVersion);
    buf.write32(packet.Data.ClientVersion.serialize());
    buf.writeString(packet.Data.Name);
    return buf;
  },
};
