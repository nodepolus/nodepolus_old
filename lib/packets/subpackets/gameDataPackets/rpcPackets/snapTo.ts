import PolusBuffer from '../../../../util/polusBuffer'
import { PacketHandler } from '../../../packet'
import Vector2 from '../../../packetElements/vector2'

export interface SnapToPacket {
	Position: Vector2
}

export const SnapTo: PacketHandler<SnapToPacket> = {
	parse(packet: PolusBuffer): SnapToPacket {
		const pos = new Vector2()
		pos.parse(packet)
		return {
			Position: pos
		}
  },

	serialize(packet: SnapToPacket): PolusBuffer {
		return packet.Position.serialize()
	}
}
