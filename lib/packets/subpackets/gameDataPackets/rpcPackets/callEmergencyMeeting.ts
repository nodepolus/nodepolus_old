import { PolusBuffer } from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface CallEmergencyMeetingPacket {
  PlayerID: number;
}

export const CallEmergencyMeeting: PacketHandler<CallEmergencyMeetingPacket> = {
  parse(packet: PolusBuffer): CallEmergencyMeetingPacket {
    return { PlayerID: packet.readU8() };
  },

  serialize(packet: CallEmergencyMeetingPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeU8(packet.PlayerID);
    return buf;
  },
};
