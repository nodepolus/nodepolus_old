import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface SendChatPacket {
	ChatText: string
}

export const SendChat: SubpacketClass<SendChatPacket> = {
	parse(packet: PolusBuffer): SendChatPacket {
		return {ChatText: packet.readString()}
  },

	serialize(packet: SendChatPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeString(packet.ChatText);
		return buf;
	}
}
