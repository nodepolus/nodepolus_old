import Room from "../../util/Room.js";
import { ObjectType } from "../Subpackets/GameDataPackets/Spawn.js";
import PolusBuffer from "../../util/PolusBuffer.js";
import SystemType from "./SystemType.js";
import StateByte, { StateByteInterface } from "./StateByte.js";
import Vector2 from "./Vector2.js";
import AmongUsMap from "../../data/enums/AmongUsMap.js";

interface ComponentData {
	OwnerID: bigint,
	length: number,
	type: number,
	rawData: PolusBuffer
}

enum Components{
	ShipStatus,
	MeetingHud,
	LobbyBehavior,
	GameData,
	VoteBanSystem,
	PlayerControl,
	PhysicsControl,
	CustomTransform
}

interface ShipStatusData{
	system: SystemType,
	data: object
}

interface PlayerControlData{
	new: boolean,
	id: number
}

interface CustomTransformData{
	lastSequenceId: number,
	targetPosition: Vector2,
	targetVelocity: Vector2
}

interface GameDataPlayerData{
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

interface PlayerVoteBanSystem {
	Players: Map<number, bigint[]>,
}

type ComponentDataTyped = | ShipStatusData | StateByteInterface | PlayerControlData | CustomTransformData | GameDataPlayerData | bigint | PlayerVoteBanSystem;

const statusHandler: Map<SystemType, {read: (buffer: PolusBuffer, room: Room, spawn: boolean) => object, write: (obj: any, buf: PolusBuffer, room: Room, spawn: boolean) => void}> = new Map();
{
	statusHandler.set(SystemType.Electrical, {
		read: (buf, rm) => {
			let expected = buf.readU8().toString(2).padStart(5, "0").split('').map(c=>c=="1")
			let actual = buf.readU8().toString(2).padStart(5, "0").split('').map(c=>c=="1")
			return {
				ExpectedSwitches: expected,
				ActualSwitches: actual,
				Value: buf.readU8()/2.55
			};
		},
		write: (obj, buf, rm) => {
			buf.writeU8(parseInt(obj.ExpectedSwitches.map((e: boolean)=>e?"1":"0").join(''), 2));
			buf.writeU8(parseInt(obj.ActualSwitches.map((e:boolean)=>e?"1":"0").join(''), 2));
			buf.writeU8(obj.Value*2.55);
		}
	});
	statusHandler.set(SystemType.Medbay, {
		read: (buf, rm) => {
			const length = Number(buf.readVarInt());
			const users = [];
			for(let i=0;i<length;i++)users.push(buf.readU8());
			return {
				Users: users
			}
		},
		write: (obj, buf, rm) => {
			buf.writeVarInt(BigInt(obj.Users.length))
			for (let i = 0; i < obj.Users.length; i++) {
				buf.writeU8(obj.Users[i])
			}
		}
	});
	statusHandler.set(SystemType.Communications, {
		read:(buf, rm) => {
			if (rm.settings.Map == AmongUsMap.MIRA_HQ){
				let length = Number(buf.readVarInt());
				const active = [];
				for(let i=0;i<length;i++)active.push([buf.readU8(), buf.readU8()]);
				length = Number(buf.readVarInt());
				const completed = [];
				for(let i=0;i<length;i++)completed.push(buf.readU8());
				return {
					ActiveConsoles: active,
					CompletedConsoles: completed
				}
			}else {
				return {
					IsSabotaged: buf.readBoolean()
				};
			}
		},
		write: (obj, buf, rm) => {
			if (rm.settings.Map == AmongUsMap.MIRA_HQ){
				buf.writeVarInt(BigInt(obj.ActiveConsoles.length))
				for(let i=0;i<obj.ActiveConsoles.length;i++){
					buf.writeU8(obj.ActiveConsoles[i][0]);
					buf.writeU8(obj.ActiveConsoles[i][1]);
				}
				buf.writeVarInt(BigInt(obj.CompletedConsoles.length))
				for(let i=0;i<obj.CompletedConsoles.length;i++){
					buf.writeU8(obj.CompletedConsoles[i]);
				}
			} else {
				buf.writeBoolean(obj.IsSabotaged)
			}
		}
	});
	statusHandler.set(SystemType.Security, {
		read:(buf, rm) => {
			const length = Number(buf.readVarInt());
			const users = [];
			for(let i=0;i<length;i++)users.push(buf.readU8());
			return {
				Users: users
			}
		},
		write: (obj, buf, rm) => {
			buf.writeVarInt(BigInt(obj.Users.length))
			for (let i = 0; i < obj.Users.length; i++) {
				buf.writeU8(obj.Users[i])
			}
		}
	});
	statusHandler.set(SystemType.Reactor, {
		read: (buf, rm) => {
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
		},
		write: (obj, buf, rm) => {
			buf.writeFloat32(obj.Countdown);
			let entries = [...obj.UserConsolePairs.entries()];
			buf.writeVarInt(BigInt(entries.length));
			for (let i = 0; i < entries.length; i++) {
				const entry = entries[i];
				buf.writeU8(entry[0])
				buf.writeU8(entry[1])
			}
		}
	});
	statusHandler.set(SystemType.O2, {
		read: (buf, rm) => {
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
		},
		write: (obj, buf, rm) => {
			buf.writeFloat32(obj.Countdown);
			buf.writeVarInt(BigInt(obj.Consoles.length));
			for (let i = 0; i < obj.Consoles.length; i++) {
				buf.writeU8(obj.Consoles[i])
			}
		}
	});
	const doorcnts = [13, 0, 12];
	statusHandler.set(SystemType.Doors, {
		read: (buf, rm, spawn) => {
			let doors = [];
			let length = doorcnts[rm.settings.Map];
			let mask;
			if(!spawn) {
				mask = Number(buf.readVarInt());
			}
			for (let i=0;i<length;i++){
				if (mask === undefined || (mask & (1 << i)) !== 0)doors.push(buf.readBoolean());
			}
			return {
				Mask: mask,
				Doors: doors,
				UnmodifiedDoors: doors
			}
		},
		write: (obj, buf, rm, spawn) => {
			if (!spawn) {
				buf.writeVarInt(BigInt(obj.Mask)); // should be dirtyBits
			}
			for (let i = 0; i < obj.Doors.length; i++) {
				buf.writeBoolean(obj.Doors[i])
			}
		}
	});
	statusHandler.set(SystemType.Sabotage, {
		read: (buf, rm) => {
			return {
				Timer: buf.readFloat32()
			}
		},
		write: (obj, buf, rm) => {
			buf.writeFloat32(obj.Timer)
		}
	});
}
SystemType.Electrical, SystemType.Medbay, SystemType.Security, SystemType.Communications, SystemType.Doors, SystemType.Sabotage, SystemType.Laboratory
const skeldSystems = [SystemType.Reactor, SystemType.Electrical, SystemType.O2, SystemType.Medbay, SystemType.Security, SystemType.Communications, SystemType.Doors, SystemType.Sabotage];
const miraSystems = [SystemType.Reactor, SystemType.Electrical, SystemType.O2, SystemType.Medbay, SystemType.Communications, SystemType.Sabotage];
const polusSystems = [];

export default class Component {
	netID: bigint;
	length: number;
	type: number;
	rawData: PolusBuffer;
	Type: Components;
	mask: BigInt;
	Data: ComponentDataTyped[] = [];
	private OldData: ComponentDataTyped[];
	constructor(private spawnId: bigint, private componentIndex: number, private room: Room){

	}
	parse(spawn: boolean, source: PolusBuffer) {
		if(spawn) {
			this.netID = source.readVarInt();
			this.length = source.readU16();
			this.type = source.readU8();
		}

		const {room, spawnId, componentIndex} = this;
		//todo finish components
		//todo make changes for non-onspawn parsing
		switch(Number(spawnId)){
			case ObjectType.ShipStatus:
			case ObjectType.AprilShipStatus:
			case ObjectType.PlanetMap:
			case ObjectType.HeadQuarters:
				this.Type = Components.ShipStatus;
				this.mask = spawn ? BigInt(0xFFFFFFFF) : source.readVarInt();
				let systems = (room.settings.Map == 0 || room.settings.Map == 7 ? skeldSystems : (room.settings.Map == 1 ? miraSystems : polusSystems));
				const len = Object.keys(SystemType).length/2;
				let h = 0;
				for(let i=0;i<len;i++){
					if (spawn){
						for (let j of systems){
							if (i == j){
								this.Data.push({system: i, data: statusHandler.get(i).read(source, room, true)});
							}
						}
					}else {
						//do not convert mask to number later
						if ((Number(this.mask) & (1 << i)) !== 0){
							for (let j of systems){
								if (i == j){
									let data = <ShipStatusData>this.Data[h++];
									data.data = statusHandler.get(data.system).read(source, room, false);
								}
							}
						}
					}
				}
				break;
			case ObjectType.MeetingHud:
				this.Type = Components.MeetingHud;
				for (let i=0;i<this.length;i++){
					this.Data[i] = (StateByte.parse(source.readU8()));
				}
				break;
			case ObjectType.Player:
				if (componentIndex == 0){
					this.Type = Components.PlayerControl;
					this.Data[0] = ({
						new: spawn ? source.readBoolean() : false,
						id: source.readU8()
					});
					//console.log(this.Data[0]);
				}else if (componentIndex == 2){
					this.Type = Components.CustomTransform;
					let dataObj: CustomTransformData = {
						lastSequenceId: source.readU16(),
						targetPosition: new Vector2().parse(source),
						targetVelocity: new Vector2().parse(source)
					};
					this.Data[0] = dataObj;
				}else {
					this.Type = Components.PhysicsControl;
				}
				break;
			case ObjectType.LobbyBehavior:
				this.Type = Components.LobbyBehavior;
				//nothing except *PURE CRING*
				break;
			case ObjectType.GameData:
				if (componentIndex == 0){
					this.Type = Components.GameData;
					let PlayerCount = spawn ? source.readVarInt() : source.readU8();
					let PlayerData: GameDataPlayerData;
					for (let i = 0; i < PlayerCount; i++) {
						PlayerData = {
							PlayerID: source.readU8(),
							PlayerName: source.readString(),
							Color: source.readVarInt(),
							HatID: source.readVarInt(),
							PetID: source.readVarInt(),
							SkinID: source.readVarInt(),
							Flags: {Dead:false,Impostor:false,Disconnected:false},
							Tasks: []
						};
						let FlagsBitfield = source.readU8();
						PlayerData.Flags = {
							Disconnected: (FlagsBitfield & 0b00000001) != 0,
							Impostor: (FlagsBitfield & 0b00000010) != 0,
							Dead: (FlagsBitfield & 0b00000100) != 0
						}
						PlayerData.Tasks = Array(source.readU8())
						for (let i2 = 0; i2 < PlayerData.Tasks.length; i2++) {
							PlayerData.Tasks[i2] = {
								TaskID: source.readVarInt(),
								TaskCompleted: source.readBoolean()
							}
						}
						this.Data.push(PlayerData);
					}
					break;
				}
				if (componentIndex == 1) {
					let o: PlayerVoteBanSystem = {
						Players: new Map()
					};
					this.Type = Components.VoteBanSystem;
					let ArrLen = source.readU8()
					for (let i = 0; i < ArrLen; i++) {
						let ClientID = source.read32();
						if(ClientID == 0x00) break;
						if(!o.Players.has(ClientID)) {
							o.Players.set(ClientID, [
								source.readVarInt(),
								source.readVarInt(),
								source.readVarInt(),
							])
						}
					}
					this.Data.push(o)
					//NetID packedInt32
					//Message Length,Tag
					//Length Byte
						//ClientID Int32
						//Length Byte
							//ClientID VarInt
				}
				break;
		}
		//this.OldData = this.Data;
	}

	serialize(spawn: boolean):PolusBuffer{
		let pb = new PolusBuffer();
		let comp = this;// COPY COMPONENT
		let datalen = comp.Data.length;
		if(spawn) {
			pb.writeVarInt(comp.netID);
			pb.writeU16(comp.length);
			pb.writeU8(0x01)
		}
		switch (comp.Type){
			case Components.ShipStatus:
				let systemBufs = [];
				for(let i=0;i<datalen;i++){//is there a length for this packet
					let data: ShipStatusData = <ShipStatusData>comp.Data[i];
					let buf = new PolusBuffer();
					if (spawn){
						statusHandler.get(data.system).write(data.data, buf, comp.room, true);
					} else if (comp.Data[i]){
						if (Number(comp.mask) & (1 << i)){
							statusHandler.get(data.system).write(data.data, buf, comp.room, false);
							systemBufs.push(buf);
						}
					}
				}
				pb.writeVarInt(BigInt(comp.mask));
				let systemBufferCombined = PolusBuffer.concat(...systemBufs);
				pb.writeBytes(systemBufferCombined);
				break;
			case Components.MeetingHud:
				for(let i=0;i<datalen;i++){
					pb.writeU8(StateByte.serialize(<StateByteInterface>comp.Data[i]));
				}
				break;
			case Components.PlayerControl:
				for(let i=0;i<datalen;i++){
					const data: PlayerControlData = <PlayerControlData>comp.Data[i];
					if (spawn){
						//console.log("is new player",data.id,data.new);
						pb.writeBoolean(data.new);
					}
					pb.writeU8(data.id);
				}
				break;
			case Components.CustomTransform:
				const data: CustomTransformData = <CustomTransformData>comp.Data[0];
				pb.writeU16(data.lastSequenceId);
				pb.writeBytes(data.targetPosition.serialize());
				pb.writeBytes(data.targetVelocity.serialize());
				break;
			case Components.LobbyBehavior:
			case Components.PhysicsControl:
				break;
			case Components.GameData:
				if (spawn)pb.writeVarInt(BigInt(datalen));
				else pb.writeU8(datalen);
				for (let i=0;i<datalen;i++){
					let player: GameDataPlayerData = <GameDataPlayerData>comp.Data[i];
					pb.writeU8(player.PlayerID);
					pb.writeString(player.PlayerName);
					pb.writeVarInt(player.Color);
					pb.writeVarInt(player.HatID);
					pb.writeVarInt(player.PetID);
					pb.writeVarInt(player.SkinID);
					pb.writeU8(
						(player.Flags.Disconnected ? 1 : 0) |
						(player.Flags.Impostor ? 2 : 0) |
						(player.Flags.Dead ? 4 : 0)
					);
					pb.writeU8(player.Tasks.length);
					for(let j=0;j<player.Tasks.length;j++){
						pb.writeVarInt(player.Tasks[j].TaskID);
						pb.writeBoolean(player.Tasks[j].TaskCompleted);
					}
				}
				break;
			case Components.VoteBanSystem:
				let vote: PlayerVoteBanSystem = <PlayerVoteBanSystem>comp.Data[0];
				pb.writeU8(vote.Players.size);
				for(let x of vote.Players.entries()){
					pb.write32(x[0]);
					pb.writeVarInt(x[1][0]);
					pb.writeVarInt(x[1][1]);
					pb.writeVarInt(x[1][2]);
				}
				break;
		}
		return pb;
	}
	
	copy(): Component{
		
	}
}