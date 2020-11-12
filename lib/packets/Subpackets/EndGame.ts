import RoomCode from '../PacketElements/RoomCode'
import PolusBuffer from '../../util/PolusBuffer'
import DisconnectReason from '../PacketElements/DisconnectReason'
import { Room } from '../../util/Room'

export enum EndReason {
	HumansByVote = 0x00,
	HumansByTask = 0x01,
	ImpostorsByVote = 0x02,
	ImpostorsByKill = 0x03,
	ImpostorsBySabotage = 0x04,
	HumansByDisconnect = 0x05,
	ImpostorsByDisconnect = 0x06
}

export interface EndGamePacket {
  type: 'EndGame',
	RoomCode: string,
	EndReason: EndReason,
	ShowAdvert: boolean
}

export class EndGame {
	constructor(private room: Room) {}
	parse(packet: PolusBuffer): EndGamePacket {
		return {
      type: 'EndGame',
			RoomCode: RoomCode.intToString(packet.read32()),
			EndReason: packet.readU8(),
			ShowAdvert: packet.readBoolean()
		};
	}
	serialize(packet: EndGamePacket): PolusBuffer {
		const buf = new PolusBuffer(6);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeU8(packet.EndReason);
		buf.writeBoolean(packet.ShowAdvert);
		return buf;
	};
}