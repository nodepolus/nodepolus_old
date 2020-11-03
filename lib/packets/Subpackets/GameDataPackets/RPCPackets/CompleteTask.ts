import PolusBuffer from "../../../../util/PolusBuffer";

export interface CompleteTaskPacket {
	TaskIndex: number
}

export default class CompleteTask {

	parse(packet: PolusBuffer): CompleteTaskPacket {
		return {
			TaskIndex: packet.readU8()
		};
	}
	serialize(packet: CompleteTaskPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(packet.TaskIndex);
		return buf;
	};
};