import { EventEmitter } from "events";
import Room from "./Room.js";
import Component from "../packets/PacketElements/Component.js";
import Vector2 from "../packets/PacketElements/Vector2.js";
import { PlayerColor, PlayerSkin, PlayerHat, PlayerPet, Vent } from "../data/enums/playerEnums.js";
import Task from "./Task.js";

export default class Player extends EventEmitter {
	room?: Room;
	clientID: number; // otherwise known as OwnerID
	playerID: number;
	netID: number;
	get components():Component[] {
		return this.room.GameObjects.find(GO => GO.ClientID == BigInt(this.clientID)).Components
	}
	get position():Vector2 {
		// do pos handling
		return new Vector2(0,0)
	};
	get acceleration():Vector2 {
		// do accel handling
		return new Vector2(0,0)
	};
	color: PlayerColor;
	skin: PlayerSkin;
	hat: PlayerHat;
	pet: PlayerPet;
	tasks: Task[];
	isAlive: boolean;
	get votedFor():Player|undefined {
		return undefined;
	}; 
	get skippedVote():boolean {
		return false;
	}
	get calledMeeting():boolean {
		return false
	}
	isScanning: boolean;
	isImpostor: boolean;
	isVenting: boolean;
	vent?: Vent;
	isExiled: boolean;
	isKilled: boolean;
	hasDisconnected: boolean;
	scene: string;
	isHost: boolean;

	constructor(public name?: string, private ClientVersion?: number, public HazelVersion?: number) {
		super();
	}

	enterVent() {
		
	}
}