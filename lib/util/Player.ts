import { EventEmitter } from 'events'

import { Room } from './Room'
import Component from '../packets/PacketElements/Component'
import Vector2 from '../packets/PacketElements/Vector2'
import { PlayerColor, PlayerSkin, PlayerHat, PlayerPet, Vent } from '../data/enums/playerEnums'
import Task from './Task'
import Connection from './Connection'

export default class Player extends EventEmitter {
	room?: Room;
	playerID: number;
	connection: Connection;
	netID: number;
	get components():Component[] {
		return this.room.GameObjects.find(GO => GO.ClientID == BigInt(this.connection.ID)).Components
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