import { Component } from "../packets/packetElements/component";
import { GameDataPacketType } from "../packets/subpackets/gameData";

export enum SpawnFlags {
  None = 0,
  PlayerController = 1,
}

export interface IGameObject {
  type: GameDataPacketType.Spawn;
  SpawnID: number;
  ClientID: number;
  Flags: SpawnFlags;
  Components: Component[];
}
