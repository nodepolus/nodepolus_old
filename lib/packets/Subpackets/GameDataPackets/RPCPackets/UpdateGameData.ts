import PolusBuffer from "../../../../util/PolusBuffer.js";

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

export default class UpdateGameData {
	parse(packet: PolusBuffer): UpdateGameDataPacket {
		let retData: UpdateGameDataPacket = {
			PlayerDataLength: packet.read16(),
			PlayerData: [],
		};
		let i = 0;
		let subpkt = packet.readBytes(retData.PlayerDataLength)
		while (subpkt.dataRemaining().length > 0) {
			console.log(subpkt.dataRemaining())
			retData.PlayerData[i] = {
				PlayerID: subpkt.readU8(),
				PlayerName: subpkt.readString(),
				Color: subpkt.readU8(),
				HatID: subpkt.readVarInt(),
				PetID: subpkt.readVarInt(),
				SkinID: subpkt.readVarInt(),
				Flags: {
					Disconnected: false,
					Impostor: false,
					Dead: false
				},
				Tasks: []
			}
			let PlayerData = retData.PlayerData[i]
			let FlagsBitfield = subpkt.readU8();
			PlayerData.Flags = {
				Disconnected: (FlagsBitfield & 0b00000001) != 0, 
				Impostor: (FlagsBitfield & 0b00000010) != 0,
				Dead: (FlagsBitfield & 0b00000100) != 0
			}
			PlayerData.TaskAmount = subpkt.readU8();
			PlayerData.Tasks = Array(retData.PlayerData[i].TaskAmount)
			for (let i2 = 0; i2 < PlayerData.Tasks.length; i2++) {
				if(subpkt.dataRemaining().length > 0) {
					PlayerData.Tasks[i2] = {
						TaskID: subpkt.readVarInt(),
						TaskCompleted: subpkt.readBoolean()
					}
				}
			}
			i++;
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