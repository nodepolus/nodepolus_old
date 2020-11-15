import PolusBuffer from '../../../../util/polusBuffer'
import { PacketHandler } from '../../../packet'

export enum ChatNoteType {
	Vote = 0
}

export interface SendChatNotePacket {
	PlayerID: number,
	ChatNoteType: ChatNoteType
}

export const SendChatNote: PacketHandler<SendChatNotePacket> = {
	parse(packet: PolusBuffer): SendChatNotePacket {
		return {
			PlayerID: packet.readU8(),
			ChatNoteType: packet.readU8()
		}
  },

	serialize(packet: SendChatNotePacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.PlayerID);
		buf.writeU8(packet.ChatNoteType);
		return buf;
	}
}
