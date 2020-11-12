import RoomCode from '../PacketElements/RoomCode'
import PolusBuffer from '../../util/PolusBuffer'

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
    const roomCode = RoomCode.intToString(packet.read32())
    const playerClientId = packet.readU32()
    const hostClientId = packet.readU32()
    const playerCount = packet.readVarInt()

		const baseObject:JoinedGamePacket = {
      type: 'JoinedGame',
			RoomCode: roomCode,
			PlayerClientID: playerClientId,
			HostClientID: hostClientId,
			PlayerCount: playerCount,
			OtherPlayers: []
    };

		for(let i = 0; i < playerCount; i++) {
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