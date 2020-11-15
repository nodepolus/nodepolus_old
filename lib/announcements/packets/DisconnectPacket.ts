import PolusBuffer from '../../util/PolusBuffer'

export interface DisconnectPacket{

}

export default class Disconnect {
	parse(packet: PolusBuffer): DisconnectPacket {
		return {
			
		};
	}
	serialize(packet: DisconnectPacket): PolusBuffer {
		return new PolusBuffer();
	}
}

