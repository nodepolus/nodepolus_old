import PolusBuffer from '../../../../util/polusBuffer'
import { PacketHandler } from '../../../packet'

export interface SendChatPacket {
	ChatText: string
}

export const SendChat: PacketHandler<SendChatPacket> = {
	parse(packet: PolusBuffer): SendChatPacket {
		return {ChatText: packet.readString()}
  },

	serialize(packet: SendChatPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeString(packet.ChatText);
		return buf;
	}
}
