import PolusBuffer from "../../../util/PolusBuffer.js";
import Component from "../../PacketElements/Component.js";
import Room from "../../../util/Room.js";
import { IGameObject, SpawnFlags } from "../../../util/GameObject.js";

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

export default class Spawn{
	constructor(private room: Room){}
	parse(buffer: PolusBuffer): IGameObject {
		const spawnPacket: IGameObject = {
			SpawnID: buffer.readVarInt(),
			ClientID: buffer.readVarInt(),
			Flags: <SpawnFlags>buffer.readU8(),
			Components: []
		} 
		let len = buffer.readVarInt();
		for(let i=0;i<len;i++){
			let newComponent = new Component(spawnPacket.SpawnID, i, this.room);
			newComponent.parse(true, buffer);
			spawnPacket.Components.push(newComponent);
		}
		return spawnPacket;
	}
	serialize(packet: IGameObject): PolusBuffer {
		let PB = new PolusBuffer();
		PB.writeVarInt(packet.SpawnID);
		PB.writeVarInt(packet.ClientID);
		PB.writeU8(packet.Flags);
		PB.writeVarInt(BigInt(packet.Components.length));
		for (let i = 0; i < packet.Components.length; i++) {
			const component = packet.Components[i];
			PB.writeBytes(component.serialize(true))
		}
		return PB;
	};
};