import PolusBuffer from '../../util/PolusBuffer'
import RoomCode from '../PacketElements/RoomCode'

export interface AlterGamePacket {
  type: 'AlterGame',
	RoomCode: string,
	AlterGameTag: number
    IsPublic: boolean
}

export default class AlterGame {
	parse(packet: PolusBuffer): AlterGamePacket {
		return {
      type: 'AlterGame',
			RoomCode: RoomCode.intToString(packet.read32()),
			AlterGameTag: packet.readU8(),
			IsPublic: packet.readBoolean()
		};
	}

	serialize(packet: AlterGamePacket): PolusBuffer {
		const buf = new PolusBuffer(5);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeU8(packet.AlterGameTag);
		buf.writeBoolean(packet.IsPublic);
		return buf;
	}
};