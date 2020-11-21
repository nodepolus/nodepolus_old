import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";
import { roomCode } from "../packetElements/roomCode";

export interface WaitingForHostPacket {
  type: "WaitingForHost";
  RoomCode: string;
  WaitingClientID: number;
}

export const WaitingForHost: PacketHandler<WaitingForHostPacket> = {
  parse(packet: PolusBuffer): WaitingForHostPacket {
    return {
      type: "WaitingForHost",
      RoomCode: roomCode.intToString(packet.read32()),
      WaitingClientID: packet.readU32(),
    };
  },

  serialize(packet: WaitingForHostPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.write32(roomCode.stringToInt(packet.RoomCode));
    buf.writeU32(packet.WaitingClientID);
    return buf;
  },
};
