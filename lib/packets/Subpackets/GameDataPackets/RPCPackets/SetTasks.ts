import PolusBuffer from '../../../../util/PolusBuffer'

export interface SetTasksPacket {
	PlayerID: number,
	TaskCount?: bigint,
	Tasks: number[]
}

export default class SetTasks {

	parse(packet: PolusBuffer): SetTasksPacket {
    const playerId = packet.readU8()
    const taskCount = packet.readVarInt()

		let returnData: SetTasksPacket = {
			PlayerID: playerId,
			TaskCount: taskCount,
			Tasks: []
    };

		for (let i = 0; i < taskCount; i++) {
			returnData.Tasks[i] = packet.readU8();
		}
		return returnData;
	}
	serialize(packet: SetTasksPacket): PolusBuffer {
		let buf = new PolusBuffer();
		buf.writeU8(packet.PlayerID);
		buf.writeVarInt(BigInt(packet.Tasks.length));
		for (let i = 0; i < packet.Tasks.length; i++) {
			buf.writeU8(packet.Tasks[i]);
		}
		return buf;
	};
};
