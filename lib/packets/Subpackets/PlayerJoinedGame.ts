import RoomCode from "../PacketElements/RoomCode.js";
import PolusBuffer from "../../util/PolusBuffer.js";

export interface PlayerJoinedGamePacket {
	RoomCode: string,
	PlayerClientID: number,
	HostClientID: number
}

export default class PlayerJoinedGame {
	parse(packet: PolusBuffer): PlayerJoinedGamePacket {
		const playerJoinedGamePacket: PlayerJoinedGamePacket = {
			RoomCode: RoomCode.intToString(packet.read32()),
			PlayerClientID: packet.readU32(),
			HostClientID: packet.readU32()
		}
		return playerJoinedGamePacket;
	}

	serialize(packet: PlayerJoinedGamePacket): PolusBuffer {
		const buf = new PolusBuffer(12);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeU32(packet.PlayerClientID);
		buf.writeU32(packet.HostClientID);
		return buf;
	}
}