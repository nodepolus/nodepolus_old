import { roomCode } from "../packetElements/roomCode";
import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";

export enum EndReason {
  HumansByVote = 0x00,
  HumansByTask = 0x01,
  ImpostorsByVote = 0x02,
  ImpostorsByKill = 0x03,
  ImpostorsBySabotage = 0x04,
  HumansByDisconnect = 0x05,
  ImpostorsByDisconnect = 0x06,
}

export interface EndGamePacket {
  type: "EndGame";
  RoomCode: string;
  EndReason: EndReason;
  ShowAdvert: boolean;
}

export const EndGame: PacketHandler<EndGamePacket> = {
  parse(packet: PolusBuffer): EndGamePacket {
    return {
      type: "EndGame",
      RoomCode: roomCode.intToString(packet.read32()),
      EndReason: packet.readU8(),
      ShowAdvert: packet.readBoolean(),
    };
  },

  serialize(packet: EndGamePacket): PolusBuffer {
    const buf = new PolusBuffer(6);
    buf.write32(roomCode.stringToInt(packet.RoomCode));
    buf.writeU8(packet.EndReason);
    buf.writeBoolean(packet.ShowAdvert);
    return buf;
  },
};
