import { PacketHandler } from '../../packets/Packet';
import PolusBuffer from '../../util/PolusBuffer'

export interface DisconnectPacket{

}

export const Disconnect: PacketHandler<DisconnectPacket> = {
	parse(packet: PolusBuffer): DisconnectPacket {
		return {
			
		};
  },

	serialize(packet: DisconnectPacket): PolusBuffer {
		return new PolusBuffer();
	}
}
