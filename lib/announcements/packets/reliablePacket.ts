import { Unreliable, UnreliablePacket } from "./unreliablePacket";
import PolusBuffer from "../../util/polusBuffer";
import { ParsedPacket } from "./packet";
import { PacketHandler } from "../../packets/packet";
import { Room } from "../../util/room";

export interface ReliablePacket {
  Nonce: number;
  Data: UnreliablePacket;
}

export const Reliable: PacketHandler<ReliablePacket | ParsedPacket> = {
  parse(packet: PolusBuffer, room: Room): ReliablePacket {
    return {
      Nonce: packet.readU16(true),
      Data: Unreliable.parse(packet, room),
    };
  },

  serialize(packet: ParsedPacket, room: Room): PolusBuffer {
    var buf = new PolusBuffer();
    // @ts-ignore
    buf.writeU16(packet.Nonce, true);
    buf.writeBytes(Unreliable.serialize(packet.Data as UnreliablePacket, room));
    return buf;
  },
};
