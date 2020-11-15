import PolusBuffer from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface SetPetPacket {
  PetID: number;
}

export const SetPet: PacketHandler<SetPetPacket> = {
  parse(packet: PolusBuffer): SetPetPacket {
    return {
      PetID: packet.readU8(),
    };
  },

  serialize(packet: SetPetPacket): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeU8(packet.PetID);
    return buf;
  },
};
