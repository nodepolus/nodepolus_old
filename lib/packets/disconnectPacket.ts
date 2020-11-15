import PolusBuffer from "../util/polusBuffer";
import DisconnectReason from "./packetElements/disconnectReason";
import { Room } from "../util/room";
import { PacketHandler } from "./packet";

export interface DisconnectPacket {
  DisconnectReason: DisconnectReason;
}

export const Disconnect: PacketHandler<DisconnectPacket> = {
  parse(packet: PolusBuffer, room: Room): DisconnectPacket {
    return { DisconnectReason: new DisconnectReason(packet, room) };
  },

  serialize(packet: DisconnectPacket): PolusBuffer {
    return packet.DisconnectReason.serialize();
  },
};
