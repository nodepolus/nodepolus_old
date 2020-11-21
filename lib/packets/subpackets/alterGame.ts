import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";
import { roomCode } from "../packetElements/roomCode";

export interface AlterGamePacket {
  type: "AlterGame";
  RoomCode: string;
  AlterGameTag: number;
  IsPublic: boolean;
}

export const AlterGame: PacketHandler<AlterGamePacket> = {
  parse(packet: PolusBuffer): AlterGamePacket {
    return {
      type: "AlterGame",
      RoomCode: roomCode.intToString(packet.read32()),
      AlterGameTag: packet.readU8(),
      IsPublic: packet.readBoolean(),
    };
  },

  serialize(packet: AlterGamePacket): PolusBuffer {
    const buf = new PolusBuffer(5);
    buf.write32(roomCode.stringToInt(packet.RoomCode));
    buf.writeU8(packet.AlterGameTag);
    buf.writeBoolean(packet.IsPublic);
    return buf;
  },
};
