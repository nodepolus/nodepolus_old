import PolusBuffer from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface CastVotePacket {
  PlayerPlayerID: number;
  SuspectPlayerID: number;
}

export const CastVote: PacketHandler<CastVotePacket> = {
  parse(packet: PolusBuffer): CastVotePacket {
    return {
      PlayerPlayerID: packet.readU8(),
      SuspectPlayerID: packet.read8(),
    };
  },

  serialize(packet: CastVotePacket): PolusBuffer {
    var buf = new PolusBuffer(2);
    buf.writeU8(packet.PlayerPlayerID);
    buf.write8(packet.SuspectPlayerID);
    return buf;
  },
};
