import PolusBuffer from "../../../../util/PolusBuffer.js";
import Vector2 from "../../../PacketElements/Vector2.js";

export interface SnapToPacket {
	Position: Vector2
}

export default class SnapTo {

	parse(packet: PolusBuffer): SnapToPacket {
		const pos = new Vector2()
		pos.parse(packet)
		return {
			Position: pos
		}
	}
	serialize(packet: SnapToPacket): PolusBuffer {
		return packet.Position.serialize()
	};
};

