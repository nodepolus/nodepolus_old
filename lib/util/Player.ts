import { EventEmitter } from 'events'

import { Room } from './Room'
import Component from '../packets/PacketElements/Component'
import Vector2 from '../packets/PacketElements/Vector2'
import { PlayerColor, PlayerSkin, PlayerHat, PlayerPet, Vent } from '../data/enums/playerEnums'
import Task from './Task'
import Connection from './Connection'

export default class Player extends EventEmitter {
  name: string
  clientVersion: number
  hazelVersion: number

	room?: Room;
	playerID: number = -1
	connection?: Connection;
	netID: number = -1
	get components(): Component[] {
    if (!this.room) return []
		return this.room.GameObjects.find(GO => GO.ClientID == BigInt(this.connection?.ID))?.Components || []
	}
	get position():Vector2 {
		// do pos handling
		return new Vector2(0,0)
	};
	get acceleration():Vector2 {
		// do accel handling
		return new Vector2(0,0)
	};
	color: PlayerColor = PlayerColor.BLACK
	skin: PlayerSkin = PlayerSkin.None
	hat: PlayerHat = PlayerHat.None
	pet: PlayerPet = PlayerPet.None
	tasks: Task[] = []
	isAlive: boolean = false
	get votedFor():Player|undefined {
		return undefined;
	}; 
	get skippedVote():boolean {
		return false;
	}
	get calledMeeting():boolean {
		return false
	}
	isScanning: boolean = false
	isImpostor: boolean = false
	isVenting: boolean = false
	vent?: Vent;
	isExiled: boolean = false
	isKilled: boolean = false
	hasDisconnected: boolean = false
	scene: string = 'unknown'
  isHost: boolean = false
  
  constructor(name: string, clientVersion: number, hazelVersion: number) {
    super()

    this.name = name
    this.clientVersion = clientVersion
    this.hazelVersion = hazelVersion
  }

	enterVent() {
		
	}
}