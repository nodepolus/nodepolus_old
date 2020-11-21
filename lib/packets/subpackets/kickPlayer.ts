import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";
import { roomCode } from "../packetElements/roomCode";

export interface KickPlayerPacket {
  type: "KickPlayer";
  RoomCode: string;
  ClientID: bigint;
  isBanned: boolean;
}

export const KickPlayer: PacketHandler<KickPlayerPacket> = {
  parse(packet: PolusBuffer): KickPlayerPacket {
    return {
      type: "KickPlayer",
      RoomCode: roomCode.intToString(packet.read32()),
      ClientID: packet.readVarInt(),
      isBanned: packet.readBoolean(),
    };
  },

  serialize(packet: KickPlayerPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.write32(roomCode.stringToInt(packet.RoomCode));
    buf.writeVarInt(packet.ClientID);
    buf.writeBoolean(packet.isBanned);
    return buf;
  },
};
