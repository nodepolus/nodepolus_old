import Component from "../packets/PacketElements/Component.js";
import { GameDataPacketType } from "../packets/Subpackets/GameData.js";

export enum SpawnFlags {
	None = 0,
	PlayerController = 1
}

export interface IGameObject {
  type: GameDataPacketType.Spawn,
	SpawnID: bigint, 
	ClientID: bigint,
	Flags: SpawnFlags,
	Components: Component[]
}
