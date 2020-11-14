import PolusBuffer from '../util/PolusBuffer'

export interface PingPacket {
	Nonce: number
}

class Ping {
	parse(packet: PolusBuffer): PingPacket {
		return {
			"Nonce": packet.readU16(true)
		};
	}
	serialize(packet: PingPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU16(packet.Nonce, true);
		return buf;
	}
}

export default Ping;