import PolusBuffer from "../util/PolusBuffer.js";

export interface AcknowledgementPacket {
	Nonce: number
}

class Acknowledgement {
	parse(packet: PolusBuffer): AcknowledgementPacket {
		return {
			Nonce: packet.readU16(true)
		};
	}
	serialize(packet: AcknowledgementPacket): PolusBuffer {
		var buf = new PolusBuffer(3);
		buf.writeU16(packet.Nonce, true);
		buf.writeU8(0xFF);
		return buf;
	}
}

export default Acknowledgement;