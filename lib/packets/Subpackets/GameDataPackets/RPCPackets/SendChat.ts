import PolusBuffer from "../../../../util/PolusBuffer.js";

export interface SendChatPacket {
	ChatText: string
}

export default class SendChat {

	parse(packet: PolusBuffer): SendChatPacket {
		return {ChatText: packet.readString()}
	}
	serialize(packet: SendChatPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeString(packet.ChatText);
		return buf;
	};
};