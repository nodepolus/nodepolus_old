import RoomCode from "../packetElements/roomCode";
import PolusBuffer from "../../util/polusBuffer";
import { PacketHandler } from "../packet";

export interface StartGamePacket {
  type: "StartGame";
  RoomCode: string;
}

export const StartGame: PacketHandler<StartGamePacket> = {
  parse(packet: PolusBuffer): StartGamePacket {
    return {
      type: "StartGame",
      RoomCode: RoomCode.intToString(packet.read32()),
    };
  },

  serialize(packet: StartGamePacket): PolusBuffer {
    var buf = new PolusBuffer(4);
    buf.write32(RoomCode.stringToInt(packet.RoomCode));
    return buf;
  },
};
