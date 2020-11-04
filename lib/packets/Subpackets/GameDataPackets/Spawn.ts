import PolusBuffer from "../../../util/PolusBuffer.js";
import Component from "../../PacketElements/Component.js";
import Room from "../../../util/Room.js";

export interface SpawnPacket {
	SpawnId: bigint,
	OwnerId: bigint,
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
	parse(buffer: PolusBuffer): SpawnPacket {
		const spawnPacket: SpawnPacket = {
			SpawnId: buffer.readVarInt(),
			OwnerId: buffer.readVarInt(),
			Flags: <SpawnFlags>buffer.readU8(),
			Components: []
		} 
		let len = buffer.readVarInt();
		for(let i=0;i<len;i++){
			spawnPacket.Components.push(new Component(spawnPacket.SpawnId, i, true, this.room, buffer));
		}
		return spawnPacket;
	}
	serialize(packet: SpawnPacket): PolusBuffer {
		let PB = new PolusBuffer();
		PB.writeVarInt(packet.SpawnId);
		PB.writeVarInt(packet.OwnerId);
		PB.writeU8(packet.Flags);
		PB.writeVarInt(BigInt(packet.Components.length));
		for (let i = 0; i < packet.Components.length; i++) {
			const component = packet.Components[i];
			PB.writeBytes(component.serialize())
		}
		return PB
	};
};