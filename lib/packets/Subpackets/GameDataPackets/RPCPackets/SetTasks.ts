import PolusBuffer from "../../../../util/PolusBuffer.js";

export interface SetTasksPacket {
	PlayerID: number,
	TaskCount?: bigint,
	Tasks: number[]
}

export default class SetTasks {

	parse(packet: PolusBuffer): SetTasksPacket {
		let returnData: SetTasksPacket = {
			PlayerID: packet.readU8(),
			TaskCount: packet.readVarInt(),
			Tasks: []
		};
		for (let i = 0; i < returnData.Tasks.length; i++) {
			returnData.Tasks[i] = packet.readU8();
		}
		return returnData;
	}
	serialize(packet: SetTasksPacket): PolusBuffer {
		let buf = new PolusBuffer();
		buf.writeVarInt(packet.TaskCount ? packet.TaskCount : BigInt(packet.Tasks.length));
		for (let i = 0; i < packet.Tasks.length; i++) {
			buf.writeU8(packet.Tasks[i]);
		}
		return buf;
	};
};