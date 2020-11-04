import PolusBuffer from "../../../../util/PolusBuffer.js";

export interface SetPetPacket {
	PetID: number
}

export default class SetPet {

	parse(packet: PolusBuffer): SetPetPacket {
		return {
			PetID: packet.readU8()
		}
	}
	serialize(packet: SetPetPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.PetID);
		return buf;
	};
};