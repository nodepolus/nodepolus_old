import RoomCode from "../PacketElements/RoomCode.js";
import PolusBuffer from "../../util/PolusBuffer.js";

export interface JoinedGamePacket {
  	type: 'JoinedGame',
	RoomCode: string,
	PlayerClientID: number,
	HostClientID: number,
	PlayerCount?: bigint,
	OtherPlayers: bigint[]
}

export default class JoinedGame {
	parse(packet: PolusBuffer): JoinedGamePacket {
		const baseObject:JoinedGamePacket = {
      type: 'JoinedGame',
			RoomCode: RoomCode.intToString(packet.read32()),
			PlayerClientID: packet.readU32(),
			HostClientID: packet.readU32(),
			PlayerCount: packet.readVarInt(),
			OtherPlayers: []
		};
		for(let i = 0; i < baseObject.PlayerCount; i++) {
			baseObject.OtherPlayers.push(packet.readVarInt());
		}
		return baseObject;
	}
	serialize(packet: JoinedGamePacket): PolusBuffer {
		var buf = new PolusBuffer(12);
		buf.write32(RoomCode.stringToInt(packet.RoomCode))
		buf.writeU32(packet.PlayerClientID);
		buf.writeU32(packet.HostClientID);
		buf.writeVarInt(BigInt(packet.OtherPlayers.length));
		for (let i = 0; i < packet.OtherPlayers.length; i++) {
			buf.writeVarInt(packet.OtherPlayers[i]);
		}
		return buf;
	}
}