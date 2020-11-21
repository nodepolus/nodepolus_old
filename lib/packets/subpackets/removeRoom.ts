import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";
import { DisconnectReason } from "../packetElements/disconnectReason";

export interface RemoveRoomPacket {
  type: "RemoveRoom";
  DisconnectReason: DisconnectReason;
}

export const RemoveRoom: PacketHandler<RemoveRoomPacket> = {
  parse(packet: PolusBuffer): RemoveRoomPacket {
    return {
      type: "RemoveRoom",
      DisconnectReason: new DisconnectReason(packet),
    };
  },

  serialize(packet: RemoveRoomPacket): PolusBuffer {
    return packet.DisconnectReason.serialize();
  },
};
