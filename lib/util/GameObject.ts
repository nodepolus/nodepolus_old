import Component from '../packets/PacketElements/Component'
import { GameDataPacketType } from '../packets/Subpackets/GameData'

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
