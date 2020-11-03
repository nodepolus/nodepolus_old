import Room from "../../util/Room";
import { ObjectType } from "../Subpackets/GameDataPackets/Spawn";
import PolusBuffer from "../../util/PolusBuffer";
import SystemType from "./SystemType";
import StateByte, { StateByteInterface } from "./StateByte";

interface ComponentData {
	netID: bigint,
	length: number,
	type: number,
	rawData: PolusBuffer
}

interface ShipStatusData{
	system: SystemType,
	data: object
}

interface PlayerControlData{
	new: boolean,
	id: number
}

type ComponentDataTyped = Array<ShipStatusData> | Array<StateByteInterface> | PlayerControlData;

const statusHandler: Map<SystemType, (buffer: PolusBuffer, room: Room) => object> = new Map();
{
	statusHandler.set(SystemType.Electrical, (buf, rm) => {
		return {
			ExpectedSwitches: buf.readU8(),
			ActualSwitches: buf.readU8(),
			Value: buf.readU8()
		};
	});
	statusHandler.set(SystemType.Medbay, (buf, rm) => {
		const length = Number(buf.readVarInt());
		const users = [];
		for(let i=0;i<length;i++)users.push(buf.readU8());
		return {
			Users: users
		}
	});
	statusHandler.set(SystemType.Communications, (buf, rm) => {
		return {
			Active: buf.readBoolean()
		};
	});
	statusHandler.set(SystemType.Security, (buf, rm) => {
		const length = Number(buf.readVarInt());
		const users = [];
		for(let i=0;i<length;i++)users.push(buf.readU8());
		return {
			Users: users
		}
	});
	statusHandler.set(SystemType.Reactor, (buf, rm) => {
		const Countdown = buf.readFloat32();
		const length = Number(buf.readVarInt());
		const pairs = new Map();
		for(let i=0;i<length;i++){
			pairs.set(buf.readU8(), buf.readU8());
		}
		return {
			Countdown,
			UserConsolePairs: pairs
		}
	});
	statusHandler.set(SystemType.O2, (buf, rm) => {
		const Countdown = buf.readFloat32();
		const length = Number(buf.readVarInt());
		const consoles = [];
		for(let i=0;i<length;i++){
			consoles.push(buf.readU8());
		}
		return {
			Countdown,
			Consoles: consoles
		}
	});
	const doorcnts = [13, 0, 12];
	statusHandler.set(SystemType.Doors, (buf, rm) => {
		let doors = [];
		for (let i=0;i<13;i++)doors.push(buf.readBoolean());
		return {
			Doors: doors
		}
	});
	statusHandler.set(SystemType.Sabotage, (buf, rm) => {
		return {
			Timer: buf.readFloat32()
		}
	});
}

const skeldSystems = [SystemType.Electrical, SystemType.Medbay, SystemType.Communications, SystemType.Security,
	SystemType.Reactor, SystemType.O2, SystemType.Doors, SystemType.Sabotage];

export default class Component {
	netID: bigint;
	length: number;
	type: number;
	rawData: PolusBuffer;
	Data: ComponentDataTyped;

	constructor(private spawnId: number, private componentIndex: number, private spawn: boolean, private room: Room, source: PolusBuffer) {
		this.netID = source.readVarInt();
		this.length = source.readU16();
		this.type = source.readU8();
		//todo finish components
		//todo make changes for non-onspawn parsing
		switch(spawnId){
			case ObjectType.ShipStatus:
			case ObjectType.AprilShipStatus:
			case ObjectType.PlanetMap:
			case ObjectType.HeadQuarters:
				const shis: Array<ShipStatusData> = [];
				if (room.settings.Map == 0){
					for(let i=0;i<skeldSystems.length;i++){
						shis.push({system:skeldSystems[i],data:statusHandler.get(skeldSystems[i])(source, room)});
					}
				}else{
					throw new Error("Other maps not yet implemented teehee");
				}
				this.Data.push(shis);
				break;
			case ObjectType.MeetingHud:
				for (let i=0;i<room.players.length;i++){
					this.Data.push(StateByte.parse(source.readU8()));
				}
				break;
			case ObjectType.Player:
				if (componentIndex == 0){
					if (spawn){
						this.Data.
					}
				}else if (componentIndex == 1){

				}else {

				}
				break;
		}
	}
}