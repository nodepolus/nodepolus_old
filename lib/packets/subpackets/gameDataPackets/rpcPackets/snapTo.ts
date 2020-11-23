import { PolusBuffer } from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";
import { Vector2 } from "../../../packetElements/vector";

export interface SnapToPacket {
  Position: Vector2;
  SequenceID: number;
}

export const SnapTo: PacketHandler<SnapToPacket> = {
  parse(packet: PolusBuffer): SnapToPacket {
    const pos = new Vector2();
    pos.parse(packet);
    let SequenceID = packet.readU16();
    return {
      Position: pos,
      SequenceID,
    };
  },

  serialize(packet: SnapToPacket): PolusBuffer {
    let pb = new PolusBuffer(6);
    pb.writeBytes(packet.Position.serialize());
    pb.writeU16(packet.SequenceID);
    return pb;
  },
};
