import { DeconStateByteInterface } from "./deconStateByte";
import { StateByteInterface } from "./stateByte";
import { SystemType } from "./systemType";
import { Vector2 } from "./vector";

export interface MeetingHud {
  type: "MeetingHud";
  players: StateByteInterface[];
}

export interface GameDataPlayerData {
  type: "GameDataPlayerData";
  PlayerID: number;
  PlayerName: string;
  Color: bigint;
  HatID: bigint;
  PetID: bigint;
  SkinID: bigint;
  Flags: {
    Disconnected: boolean;
    Impostor: boolean;
    Dead: boolean;
  };
  Tasks: {
    TaskID: bigint;
    TaskCompleted: boolean;
  }[];
}

export interface GameData {
  type: "GameData";
  players: GameDataPlayerData[];
}

export interface ElectricalSystem {
  type: "ElectricalSystem";
  ExpectedSwitches: boolean[];
  ActualSwitches: boolean[];
  Value: number;
}

export interface UserListSystem {
  type: "SecuritySystem" | "MedbaySystem";
  Users: number[];
}

export interface MiraCommsSystem {
  type: "MiraCommsSystem";
  ActiveConsoles: number[][];
  CompletedConsoles: number[];
}

export interface SimpleCommsSystem {
  type: "SimpleCommsSystem";
  IsSabotaged: boolean;
}

export type CommsSystem = MiraCommsSystem | SimpleCommsSystem;

export interface ReactorSystem {
  type: "ReactorSystem";
  Countdown: number;
  UserConsolePairs: Map<number, number>;
}

export interface O2System {
  type: "O2System";
  Countdown: number;
  Consoles: bigint[];
}

export interface DoorSystem {
  type: "DoorSystem";
  Doors: boolean[];
}

export interface PolusDoorSystem {
  type: "DoorSystem";
  Timers: Map<number, number>;
  Doors: boolean[];
}

export interface SabotageSystem {
  type: "SabotageSystem";
  Timer: number;
}

export interface DeconSystem {
  type: "DeconSystem";
  Timer: number;
  State: DeconStateByteInterface;
}

export type System =
  | DoorSystem
  | ElectricalSystem
  | UserListSystem
  | CommsSystem
  | ReactorSystem
  | DoorSystem
  | SabotageSystem
  | O2System
  | DeconSystem;

export interface ShipStatus {
  type: "ShipStatus";
  systems: {
    system: SystemType;
    data: System;
  }[];
  mask?: number;
}

export interface PlayerControl {
  type: "PlayerControl";
  new: boolean;
  id: number;
}

export interface CustomTransformData {
  type: "CustomTransformData";
  lastSequenceID: number;
  targetPosition: Vector2;
  targetVelocity: Vector2;
}

export interface PlayerVoteBanSystem {
  type: "PlayerVoteBanSystem";
  Players: Map<number, bigint[]>;
}

export type ComponentData =
  | GameData
  | ShipStatus
  | MeetingHud
  | PlayerControl
  | CustomTransformData
  | PlayerVoteBanSystem;
