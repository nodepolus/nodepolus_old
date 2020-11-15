import PolusBuffer from '../../../../util/polusBuffer'
import { PacketHandler } from '../../../packet'

export interface SetStartCounterPacket {
	SequenceNumber: bigint,
	Time: number
}

export const SetStartCounter: PacketHandler<SetStartCounterPacket> = {
	parse(packet: PolusBuffer): SetStartCounterPacket {
		return {
			SequenceNumber: packet.readVarInt(),
			Time: packet.read8()
		}
  },

	serialize(packet: SetStartCounterPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.SequenceNumber);
		buf.write8(packet.Time)
		return buf;
	}
}
