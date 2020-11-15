import PolusBuffer from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface ClearVotePacket {}

export const ClearVote: PacketHandler<ClearVotePacket> = {
  parse(packet: PolusBuffer): ClearVotePacket {
    return {};
  },

  serialize(packet: ClearVotePacket): PolusBuffer {
    return new PolusBuffer(0);
  },
};
