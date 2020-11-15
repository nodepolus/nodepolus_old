import PolusBuffer from "../../../../util/polusBuffer";
import { PacketHandler } from "../../../packet";

export interface TaskState {
  TaskID: bigint;
  TaskCompleted: boolean;
}

export interface PlayerDataFlags {
  Disconnected: boolean;
  Impostor: boolean;
  Dead: boolean;
}

export interface PlayerData {
  PlayerID: number;
  PlayerName: string;
  Color: number;
  HatID: bigint;
  PetID: bigint;
  SkinID: bigint;
  Flags: PlayerDataFlags;
  TaskAmount?: number;
  Tasks: TaskState[];
}

export interface UpdateGameDataPacket {
  PlayerData: PlayerData[];
}

export const UpdateGameData: PacketHandler<UpdateGameDataPacket> = {
  parse(packet: PolusBuffer): UpdateGameDataPacket {
    let retData: UpdateGameDataPacket = {
      PlayerData: [],
    };
    let i = 0;
    while (packet.dataRemaining().length > 0) {
      packet.readBytes(2);
      retData.PlayerData[i] = {
        PlayerID: packet.readU8(),
        PlayerName: packet.readString(),
        Color: packet.readU8(),
        HatID: packet.readVarInt(),
        PetID: packet.readVarInt(),
        SkinID: packet.readVarInt(),
        Flags: {
          Disconnected: false,
          Impostor: false,
          Dead: false,
        },
        Tasks: [],
      };
      let PlayerData = retData.PlayerData[i];
      let FlagsBitfield = packet.readU8();
      PlayerData.Flags = {
        Disconnected: (FlagsBitfield & 0b00000001) != 0,
        Impostor: (FlagsBitfield & 0b00000010) != 0,
        Dead: (FlagsBitfield & 0b00000100) != 0,
      };
      PlayerData.TaskAmount = packet.readU8();
      PlayerData.Tasks = Array(retData.PlayerData[i].TaskAmount);
      for (let i2 = 0; i2 < PlayerData.Tasks.length; i2++) {
        if (packet.dataRemaining().length > 0) {
          PlayerData.Tasks[i2] = {
            TaskID: packet.readVarInt(),
            TaskCompleted: packet.readBoolean(),
          };
        }
      }
      i++;
    }
    return retData;
  },

  serialize(packet: UpdateGameDataPacket): PolusBuffer {
    let buf = new PolusBuffer();
    for (let i = 0; i < packet.PlayerData.length; i++) {
      var lenbuf = new PolusBuffer(2);
      var tmpbuf = new PolusBuffer();
      let PlayerData = packet.PlayerData[i];
      tmpbuf.writeU8(PlayerData.PlayerID);
      tmpbuf.writeString(PlayerData.PlayerName);
      tmpbuf.writeU8(PlayerData.Color);
      tmpbuf.writeVarInt(PlayerData.HatID);
      tmpbuf.writeVarInt(PlayerData.PetID);
      tmpbuf.writeVarInt(PlayerData.SkinID);
      let FlagsBitfield = 0;
      if (PlayerData.Flags.Disconnected) FlagsBitfield += 0b00000001;
      if (PlayerData.Flags.Impostor) FlagsBitfield += 0b00000010;
      if (PlayerData.Flags.Dead) FlagsBitfield += 0b00000100;
      tmpbuf.writeU8(FlagsBitfield);
      tmpbuf.writeU8(
        PlayerData.TaskAmount
          ? Number(PlayerData.TaskAmount)
          : PlayerData.Tasks.length
      );
      for (let i = 0; i < PlayerData.Tasks.length; i++) {
        const Task = PlayerData.Tasks[i];
        tmpbuf.writeVarInt(Task.TaskID);
        tmpbuf.writeBoolean(Task.TaskCompleted);
      }
      lenbuf.writeU16(tmpbuf.length - 1);
      buf.writeBytes(PolusBuffer.concat(lenbuf, tmpbuf));
    }
    return buf;
  },
};
