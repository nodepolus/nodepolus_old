import PolusBuffer from '../../util/PolusBuffer'

export interface RedirectPacket {
  type: 'Redirect',
	IP: string,
	Port: number
}

export default class Redirect {
	parse(packet: PolusBuffer): RedirectPacket {
		return {
      type: 'Redirect',
			IP: ([packet.readU8(), packet.readU8(), packet.readU8(), packet.readU8()]).join("."),
			Port: packet.readU16()
		};
	}

	serialize(packet: RedirectPacket): PolusBuffer {
		var buf = new PolusBuffer(12);
		const REDIRIP = packet.IP.split(".").map(e => parseInt(e));
		REDIRIP.forEach(int => {
			buf.writeU8(int)
		});
		buf.writeU16(packet.Port);
		return buf;
	}
}