import DisconnectReason, { DisconnectReasons } from "../PacketElements/DisconnectReason.js";
import PolusBuffer from "../../util/PolusBuffer.js";
import RoomCode from "../PacketElements/RoomCode.js"
import Room from "../../util/Room.js";

export interface RemovePlayerProperPacket {
 	type: 'RemovePlayer',
	RoomCode: string,
	PlayerClientID: number,
	HostClientID: number,
	DisconnectReason?: DisconnectReason
}
export interface LateRejectionPacket {
	type: 'LateRejection',
	RoomCode: string,
	PlayerClientID: bigint,
	DisconnectReason: DisconnectReasons.GameFull
} 
export type RemovePlayerPacket = RemovePlayerProperPacket|LateRejectionPacket

class RemovePlayer {
	constructor(public room: Room) {}
	parse(packet: PolusBuffer): RemovePlayerPacket {
		if(packet.dataRemaining().length >= 8) {
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
		} else {
			let roomCode = RoomCode.intToString(packet.read32())
			let PlayerClientID = packet.readVarInt();
			packet.readU8();
			return {
				type: "LateRejection",
				RoomCode: roomCode,
				PlayerClientID,
				DisconnectReason: DisconnectReasons.GameFull
			}
		}
	}
	serialize(packet: RemovePlayerPacket) {
		if(packet.type == "RemovePlayer") {
			var buf = new PolusBuffer(12);
			buf.write32(RoomCode.stringToInt(packet.RoomCode));
			buf.writeU32(packet.PlayerClientID);
			buf.writeU32(packet.HostClientID);
			if(packet.DisconnectReason) {
				buf.writeBytes(packet.DisconnectReason.serialize());
			}
			return buf;
		}
		if(packet.type == "LateRejection") {
			var buf = new PolusBuffer();
			buf.write32(RoomCode.stringToInt(packet.RoomCode));
			buf.writeVarInt(packet.PlayerClientID);
			buf.writeU8(DisconnectReasons.GameFull);
			return buf;
		}
	}
}

export default RemovePlayer;