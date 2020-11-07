import Component from "../packets/PacketElements/Component.js";

export enum SpawnFlags {
	None = 0,
	PlayerController = 1
}

export interface IGameObject {
	SpawnID: bigint, 
	ClientID: bigint,
	Flags: SpawnFlags,
	Components: Component[]
}