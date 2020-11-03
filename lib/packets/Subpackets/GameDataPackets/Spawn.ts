import PolusBuffer from "../../../util/PolusBuffer";
import Component from "../../PacketElements/Component";
import Room from "../../../util/Room";

export interface SpawnPacket {
	SpawnId: number,
	OwnerId: number,
	Flags: SpawnFlags,
	Components: Component[]
}

export enum ObjectType{
	ShipStatus = 0,
	MeetingHud = 1,
	LobbyBehavior = 2,
	GameData = 3,
	Player = 4,
	HeadQuarters = 5,
	PlanetMap = 6,
	AprilShipStatus = 7
}

export enum SpawnFlags{
	None = 0,
	PlayerController = 1
}

export default class Spawn{
	constructor(private room: Room){}
	deserialize(buffer: PolusBuffer): SpawnPacket {
		const spawnPacket: SpawnPacket = {
			SpawnId: Number(buffer.readVarInt()),
			OwnerId: Number(buffer.readVarInt()),
			Flags: <SpawnFlags>buffer.readU8(),
			Components: []
		} 
		let len = Number(buffer.readVarInt());
		for(let i=0;i<len;i++){
			spawnPacket.Components.push(new Component(spawnPacket.SpawnId, i, true, this.room, buffer));
		}
		return spawnPacket;
	}
	serialize(packet: SpawnPacket): PolusBuffer {
		return null;
	};
};