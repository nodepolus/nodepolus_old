import { roomCode } from "../packetElements/roomCode";
import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";

export interface SetGameCodePacket {
  type: "SetGameCode";
  RoomCode: string;
}

export const SetGameCode: PacketHandler<SetGameCodePacket> = {
  parse(packet: PolusBuffer): SetGameCodePacket {
    return {
      type: "SetGameCode",
      RoomCode: roomCode.intToString(packet.read32()),
    };
  },

  serialize(packet: SetGameCodePacket): PolusBuffer {
    var buf = new PolusBuffer(4);
    buf.write32(roomCode.stringToInt(packet.RoomCode));
    return buf;
  },
};
