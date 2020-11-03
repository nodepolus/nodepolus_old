import PolusBuffer from "../../../../util/PolusBuffer";

export interface TaskState {
	TaskID: bigint,
	TaskCompleted: boolean
}

export interface PlayerDataFlags {
	Disconnected: boolean,
	Impostor: boolean,
	Dead: boolean	
}

export interface PlayerData {
	PlayerID: number,
	PlayerName: string,
	Color: number,
	HatID: bigint,
	PetID: bigint,
	SkinID: bigint,
	Flags: PlayerDataFlags,
	TaskAmount?: number,
	Tasks: TaskState[]
}

export interface UpdateGameDataPacket {
	PlayerDataLength?: number,
	PlayerData: PlayerData[]
}

export default class SetTasks {

	parse(packet: PolusBuffer): UpdateGameDataPacket {
		let retData: UpdateGameDataPacket;
		retData.PlayerDataLength = packet.read16()
		retData.PlayerData = new Array(retData.PlayerDataLength)
		for (let i = 0; i < retData.PlayerData.length; i++) {
			let PlayerData = retData.PlayerData[i]
			PlayerData.PlayerID = packet.readU8();
			PlayerData.PlayerName = packet.readString();
			PlayerData.Color = packet.readU8();
			PlayerData.HatID = packet.readVarInt();
			PlayerData.PetID = packet.readVarInt();
			PlayerData.SkinID = packet.readVarInt();
			let FlagsBitfield = packet.readU8();
			PlayerData.Flags = {
				Disconnected: (FlagsBitfield & 0b00000001) != 0, 
				Impostor: (FlagsBitfield & 0b00000010) != 0,
				Dead: (FlagsBitfield & 0b00000100) != 0
			}
			PlayerData.TaskAmount = packet.readU8();
			PlayerData.Tasks = Array(retData.PlayerData[i].TaskAmount)
			for (let i2 = 0; i2 < PlayerData.Tasks.length; i2++) {
				PlayerData.Tasks[i2] = {
					TaskID: packet.readVarInt(),
					TaskCompleted: packet.readBoolean()
				}
			}
		}
		return retData
	}
	serialize(packet: UpdateGameDataPacket): PolusBuffer {
		let buf = new PolusBuffer();
		buf.writeU16(packet.PlayerDataLength ? Number(packet.PlayerDataLength) : packet.PlayerData.length);
		for (let i = 0; i < packet.PlayerData.length; i++) {
			let PlayerData = packet.PlayerData[i];
			buf.writeU8(PlayerData.PlayerID);
			buf.writeString(PlayerData.PlayerName);
			buf.writeU8(PlayerData.Color);
			buf.writeVarInt(PlayerData.HatID);
			buf.writeVarInt(PlayerData.PetID);
			buf.writeVarInt(PlayerData.SkinID);
			let FlagsBitfield = 0;
			if (PlayerData.Flags.Disconnected) FlagsBitfield += 0b00000001
			if (PlayerData.Flags.Impostor)     FlagsBitfield += 0b00000010
			if (PlayerData.Flags.Dead)         FlagsBitfield += 0b00000100
			buf.writeU8(FlagsBitfield);
			buf.writeU8(PlayerData.TaskAmount ? Number(PlayerData.TaskAmount) : PlayerData.Tasks.length)
			for (let i = 0; i < PlayerData.Tasks.length; i++) {
				const Task = PlayerData.Tasks[i];
				buf.writeVarInt(Task.TaskID);
				buf.writeBoolean(Task.TaskCompleted);
			}
		}
		return buf;
	};
};