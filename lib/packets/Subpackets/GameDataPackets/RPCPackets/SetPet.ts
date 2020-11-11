import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface SetPetPacket {
	PetID: number
}

export const SetPet: SubpacketClass<SetPetPacket> = {
	parse(packet: PolusBuffer): SetPetPacket {
		return {
			PetID: packet.readU8()
		}
  },

	serialize(packet: SetPetPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.PetID);
		return buf;
	}
}
