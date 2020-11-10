import PolusBuffer from "../../../../util/PolusBuffer";

export interface CallEmergencyMeetingPacket {
	PlayerID: number
}

export default class CallEmergencyMeeting {

	parse(packet: PolusBuffer): CallEmergencyMeetingPacket {
		return { PlayerID: packet.readU8()}
	}
	serialize(packet: CallEmergencyMeetingPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.PlayerID);
		return buf;
	};
};