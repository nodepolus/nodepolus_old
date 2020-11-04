import { EventEmitter } from "events";
import Room from "./Room";
import Component from "../packets/PacketElements/Component";
import Vector2 from "../packets/PacketElements/Vector2";

export default class Player extends EventEmitter {
	room?: Room;
	clientID: number;
	playerID: number;
	gameObject: GameObject;
	get position():Vector2 {};
	get acceleration():Vector2 {};
	color: PlayerColor;
	skin: PlayerSkin;
	hat: PlayerHat;
	pet: PlayerPet;
	tasks: Task[];
	isAlive: boolean;
	get votedFor() {}; // if a meeting is in session, return the player this player voted for, if they voted skip return 0. If they haven't voted return undefined
	get calledMeeting() {} // if a meeting is in session, return true if this player called the meeting
	isScanning: boolean;
	isImpostor: boolean;
	isVenting: boolean;
	vent: Vent;
	isExiled: boolean;
	isKilled: boolean;
	hasDisconnected: boolean;
	scene: string;
	isHost: boolean;

	constructor(public name?: string, private ClientVersion?: number, public HazelVersion?: number) {
		super();
	}
}