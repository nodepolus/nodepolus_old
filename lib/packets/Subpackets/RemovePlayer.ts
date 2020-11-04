import DisconnectReason from "../PacketElements/DisconnectReason.js";
import PolusBuffer from "../../util/PolusBuffer.js";
import RoomCode from "../PacketElements/RoomCode.js"
import Room from "../../util/Room.js";

export interface RemovePlayerPacket {
	RoomCode: string,
	PlayerClientID: number,
	HostClientID: number,
	DisconnectReason: DisconnectReason
}

class RemovePlayer {
	constructor(public room: Room) {}
	parse(packet: PolusBuffer): RemovePlayerPacket {
		return {
			RoomCode: RoomCode.intToString(packet.read32()),
			PlayerClientID: packet.readU32(),
			HostClientID: packet.readU32(),
			DisconnectReason: new DisconnectReason(packet, this.room)
		};
	}
	serialize(packet: RemovePlayerPacket) {
		var buf = new PolusBuffer(12);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeU32(packet.PlayerClientID);
		buf.writeU32(packet.HostClientID);
		buf.writeBytes(packet.DisconnectReason.serialize())
	}
}

export default RemovePlayer;