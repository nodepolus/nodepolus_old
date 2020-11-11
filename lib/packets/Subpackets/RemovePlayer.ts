import DisconnectReason from "../PacketElements/DisconnectReason.js";
import PolusBuffer from "../../util/PolusBuffer.js";
import RoomCode from "../PacketElements/RoomCode.js"
import Room from "../../util/Room.js";

export interface RemovePlayerPacket {
  type: 'RemovePlayer',
	RoomCode: string,
	PlayerClientID: number,
	HostClientID: number,
	DisconnectReason?: DisconnectReason
}

class RemovePlayer {
	constructor(public room: Room) {}
	parse(packet: PolusBuffer): RemovePlayerPacket {
		let roomCode = RoomCode.intToString(packet.read32())
		let PlayerClientID = packet.readU32()
		let HostClientID = packet.readU32();
		let DisconnectReasonts;
		if(packet.dataRemaining().length > 0) {
			DisconnectReasonts = new DisconnectReason(packet, this.room)
		}
		return {
			type: 'RemovePlayer',
			RoomCode: roomCode,
			PlayerClientID,
			HostClientID,
			DisconnectReason: DisconnectReasonts
		};
	}
	serialize(packet: RemovePlayerPacket) {
		var buf = new PolusBuffer(12);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeU32(packet.PlayerClientID);
		buf.writeU32(packet.HostClientID);
		if(packet.DisconnectReason) {
			buf.writeBytes(packet.DisconnectReason.serialize());
		}
		return buf;
	}
}

export default RemovePlayer;