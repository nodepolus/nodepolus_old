import { DeconStateByteInterface } from "./DeconStateByte";
import { StateByteInterface } from "./StateByte";
import SystemType from "./SystemType";
import Vector2 from "./Vector2";

export interface MeetingHud {
    players: StateByteInterface[]
}

export interface GameDataPlayerData {
	PlayerID: number,
	PlayerName: string,
	Color: bigint,
	HatID: bigint,
	PetID: bigint,
	SkinID: bigint,
	Flags: {
		Disconnected: boolean,
		Impostor: boolean,
		Dead: boolean
	},
	Tasks: {
		TaskID: bigint,
		TaskCompleted: boolean
	}[]
}

export interface GameData {
    players: GameDataPlayerData[]
}

export interface ElectricalSystem {
	ExpectedSwitches: boolean[],
	ActualSwitches: boolean[],
	Value: number
}

export interface UserListSystem {
	Users: number[]
}

export interface MiraCommsSystem {
	ActiveConsoles: number[][],
	CompletedConsoles: number[]
}

export interface SimpleCommsSystem {
	IsSabotaged: boolean
}

export type CommsSystem = MiraCommsSystem | SimpleCommsSystem;

export interface ReactorSystem {
	Countdown: number,
	UserConsolePairs: Map<number, number>
}

export interface O2System {
	Countdown: number,
	Consoles: bigint[]
}

export interface DoorSystem {
    Doors: boolean[]
}

export interface PolusDoorSystem {
    Timers: Map<number, number>,
    Doors: boolean[]
}

export interface SabotageSystem {
	Timer: number
}

export interface DeconSystem {
    Timer: number,
    State: DeconStateByteInterface
}

export type System = DoorSystem | ElectricalSystem | UserListSystem | CommsSystem | ReactorSystem | DoorSystem | SabotageSystem | O2System | DeconSystem;

export interface ShipStatus {
    systems: {
		system: SystemType,
		data: System
	}[],
	mask?: number
}

export interface PlayerControl {
	new: boolean,
	id: number
}

export interface CustomTransformData {
	lastSequenceID: number,
	targetPosition: Vector2,
	targetVelocity: Vector2
}

export interface PlayerVoteBanSystem {
	Players: Map<number, bigint[]>;
}

export type ComponentData = ShipStatus | MeetingHud | GameDataPlayerData | PlayerControl | CustomTransformData | PlayerVoteBanSystem;
