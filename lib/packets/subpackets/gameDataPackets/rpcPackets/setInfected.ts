import { PolusBuffer } from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface SetInfectedPacket {
  InfectedCount?: bigint;
  InfectedPlayerIDs: bigint[];
}

export const SetInfected: PacketHandler<SetInfectedPacket> = {
  parse(packet: PolusBuffer): SetInfectedPacket {
    const count = packet.readVarInt();

    let returnData: SetInfectedPacket = {
      InfectedCount: count,
      InfectedPlayerIDs: [],
    };
    for (let i = 0; i < count; i++) {
      returnData.InfectedPlayerIDs[i] = packet.readVarInt();
    }
    return returnData;
  },

  serialize(packet: SetInfectedPacket): PolusBuffer {
    let buf = new PolusBuffer();
    buf.writeVarInt(BigInt(packet.InfectedPlayerIDs.length));
    for (let i = 0; i < packet.InfectedPlayerIDs.length; i++) {
      buf.writeVarInt(BigInt(packet.InfectedPlayerIDs[i]));
    }
    return buf;
  },
};
