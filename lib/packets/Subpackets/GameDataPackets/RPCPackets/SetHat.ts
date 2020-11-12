import PolusBuffer from '../../../../util/PolusBuffer'

export interface SetHatPacket {
	Hat: number
}

export default class SetHat {

	parse(packet: PolusBuffer): SetHatPacket {
		return {Hat: packet.readU8()}
	}
	serialize(packet: SetHatPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.Hat);
		return buf;
	};
};