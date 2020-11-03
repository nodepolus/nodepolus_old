import { UnreliablePacket, Unreliable } from "./UnreliablePacket";
import PolusBuffer from "../util/PolusBuffer";
import { ParsedPacket } from "./Packet";

export interface ReliablePacket {
	Nonce: number,
	Data: UnreliablePacket
}

class Reliable {
	constructor(private toServer: boolean) {}
	UnreliablePacketHandler = new Unreliable()
	parse(packet: PolusBuffer): ReliablePacket {
		return {
			Nonce: packet.readU16(true),
			Data: this.UnreliablePacketHandler.parsePacket(packet, this.toServer)
		};
	}
	serialize(packet: ParsedPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU16(packet.Nonce);
		return buf;
	}
}

export default Reliable;