import SystemType from "./SystemType.js";
import Room from "../../util/Room.js";
import PolusBuffer from "../../util/PolusBuffer.js";
import AmongUsMap from "../../data/enums/AmongUsMap.js";
import { ObjectType } from "../Subpackets/GameDataPackets/Spawn.js";
import StateByte, { StateByteInterface } from "./StateByte.js";
import { ComponentData, MeetingHud, GameDataPlayerData, GameData, PlayerVoteBanSystem, ElectricalSystem, System, UserListSystem, CommsSystem, MiraCommsSystem, SimpleCommsSystem, O2System, DoorSystem, SabotageSystem, ReactorSystem, ShipStatus, PlayerControl, CustomTransformData } from "./ComponentTypes.js";
import Vector2 from "./Vector2.js";

function shallowEqual(object1: any, object2: any) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key of keys1) {
		if (object1[key] !== object2[key]) {
			return false;
		}
	}

	return true;
}

//stolen from SO 
function arraysEqual(a: any[], b: any[]) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	for (let i = 0; i < a.length; ++i) {
	  if (a[i] !== b[i]) return false;
	}
	return true;
}

const SYSTEM_HANDLER:
	Map<SystemType, {
		read: (buf: PolusBuffer, rm: Room, spawn?: boolean) => System,
		write: (obj: System, buf: PolusBuffer, rm: Room, spawn?: boolean, old?: System) => void,
		check: (obj: System, old: System) => boolean
	}> = new Map();

/// *** Electrical *** ///

SYSTEM_HANDLER.set(SystemType.Electrical, {
	read: (buf, rm) => {
		let expected = buf.readU8().toString(2).padStart(5, "0").split('').map(c => c == "1")
		let actual = buf.readU8().toString(2).padStart(5, "0").split('').map(c => c == "1")
		return {
			ExpectedSwitches: expected,
			ActualSwitches: actual,
			Value: buf.readU8()
		};
	},
	write: (obj: ElectricalSystem, buf, rm) => {
		buf.writeU8(parseInt(obj.ExpectedSwitches.map((e: boolean) => e ? "1" : "0").join(''), 2));
		buf.writeU8(parseInt(obj.ActualSwitches.map((e: boolean) => e ? "1" : "0").join(''), 2));
		buf.writeU8(obj.Value);
	},
	check: (obj: ElectricalSystem, old: ElectricalSystem) => {
		if(obj.Value !== old.Value) return true;
		if (!arraysEqual(obj.ExpectedSwitches, old.ExpectedSwitches))return true;
		return !arraysEqual(obj.ActualSwitches, old.ActualSwitches);
		
	}
})

/// *** Medbay *** ///

SYSTEM_HANDLER.set(SystemType.Medbay, {
	read: (buf, rm) => {
		const length = Number(buf.readVarInt());
		const users = [];
		for (let i = 0; i < length; i++)users.push(buf.readU8());
		return {
			Users: users
		}
	},
	write: (obj: UserListSystem, buf, rm) => {
		buf.writeVarInt(BigInt(obj.Users.length))
		for (let i = 0; i < obj.Users.length; i++) {
			buf.writeU8(obj.Users[i])
		}
	},
	check: (obj: UserListSystem, old: UserListSystem)=>{
		return !arraysEqual(obj.Users, old.Users);
	}
});

/// *** Communications *** ///

SYSTEM_HANDLER.set(SystemType.Communications, {
	read: (buf, rm) => {
		if (rm.settings.Map == AmongUsMap.MIRA_HQ) {
			let length = Number(buf.readVarInt());
			const active = [];
			for (let i = 0; i < length; i++)active.push([buf.readU8(), buf.readU8()]);
			length = Number(buf.readVarInt());
			const completed = [];
			for (let i = 0; i < length; i++)completed.push(buf.readU8());
			return {
				ActiveConsoles: active,
				CompletedConsoles: completed
			}
		} else {
			return {
				IsSabotaged: buf.readBoolean()
			};
		}
	},
	write: (obj: CommsSystem, buf, rm) => {
		if (rm.settings.Map == AmongUsMap.MIRA_HQ) {
			let sys: MiraCommsSystem = <MiraCommsSystem>obj;
			buf.writeVarInt(BigInt(sys.ActiveConsoles.length))
			for (let i = 0; i < sys.ActiveConsoles.length; i++) {
				buf.writeU8(sys.ActiveConsoles[i][0]);
				buf.writeU8(sys.ActiveConsoles[i][1]);
			}
			buf.writeVarInt(BigInt(sys.CompletedConsoles.length))
			for (let i = 0; i < sys.CompletedConsoles.length; i++) {
				buf.writeU8(sys.CompletedConsoles[i]);
			}
		} else {
			buf.writeBoolean((<SimpleCommsSystem>obj).IsSabotaged)
		}
	},
	check: (curr: CommsSystem, old: CommsSystem) => {
		if("IsSabotaged" in curr && "IsSabotaged" in old) {
			// assume SimpleComsSystem
			return curr.IsSabotaged != curr.IsSabotaged
		} else {
			// assume MiraComsSystem
			if (!arraysEqual((<MiraCommsSystem>curr).ActiveConsoles.flat(), (<MiraCommsSystem>old).ActiveConsoles.flat())) return true
			if (!arraysEqual((<MiraCommsSystem>curr).CompletedConsoles.flat(), (<MiraCommsSystem>old).CompletedConsoles.flat())) return true
		}
		
		return false
	}
});

/// *** Security *** ///

SYSTEM_HANDLER.set(SystemType.Security, {
	read: (buf, rm) => {
		const length = Number(buf.readVarInt());
		const users = [];
		for (let i = 0; i < length; i++)users.push(buf.readU8());
		return {
			Users: users
		}
	},
	write: (obj: UserListSystem, buf, rm) => {
		buf.writeVarInt(BigInt(obj.Users.length))
		for (let i = 0; i < obj.Users.length; i++) {
			buf.writeU8(obj.Users[i])
		}
	},
	check: (obj: UserListSystem, old: UserListSystem)=>{
		return !arraysEqual(obj.Users, old.Users);
	}
});

/// *** Reactor *** ///

SYSTEM_HANDLER.set(SystemType.Reactor, {
	read: (buf, rm): ReactorSystem => {
		const Countdown = buf.readFloat32();
		const length = Number(buf.readVarInt());
		const pairs = new Map();
		for (let i = 0; i < length; i++) {
			pairs.set(buf.readU8(), buf.readU8());
		}
		return {
			Countdown,
			UserConsolePairs: pairs
		}
	},
	write: (obj: ReactorSystem, buf, rm) => {
		buf.writeFloat32(obj.Countdown);
		let entries = [...obj.UserConsolePairs.entries()];
		buf.writeVarInt(BigInt(entries.length));
		for (let i = 0; i < entries.length; i++) {
			const entry = entries[i];
			buf.writeU8(entry[0])
			buf.writeU8(entry[1])
		}
	},
	check: (curr: ReactorSystem, old: ReactorSystem) => {
		if (curr.Countdown != old.Countdown) return true
		let currentries = [...curr.UserConsolePairs.entries()];
		let oldentries = [...old.UserConsolePairs.entries()];
		if (!arraysEqual(currentries.flat(), oldentries.flat())) return true
		return false
	}
});

/// *** O2 *** ///

SYSTEM_HANDLER.set(SystemType.O2, {
	read: (buf, rm) => {
		const Countdown = buf.readFloat32();
		const length = Number(buf.readVarInt());
		const consoles = [];
		for (let i = 0; i < length; i++) {
			consoles.push(buf.readVarInt());
		}
		return {
			Countdown,
			Consoles: consoles
		};
	},
	write: (obj: O2System, buf, rm) => {
		buf.writeFloat32(obj.Countdown);
		buf.writeVarInt(BigInt(obj.Consoles.length));
		for (let i = 0; i < obj.Consoles.length; i++) {
			buf.writeVarInt(obj.Consoles[i]);
		}
	},
	check: (curr:O2System, old:O2System) => {
		if(curr.Countdown != old.Countdown) return true;
		return !arraysEqual(curr.Consoles, old.Consoles);
	}
});

/// *** Doors *** ///

export const SYSTEM_DOOR_COUNT = [13, 0, 12];
SYSTEM_HANDLER.set(SystemType.Doors, {
	read: (buf, rm, spawn) => {
		let doors = [];
		let length = SYSTEM_DOOR_COUNT[rm.settings.Map];
		let mask;
		if (!spawn) {
			mask = Number(buf.readVarInt());
		}
		for (let i = 0; i < length; i++) {
			if (spawn || (mask & (1 << i)) !== 0) doors[i] = buf.readBoolean();
		}
		return {
			Doors: doors
		}
	},
	write: (obj: DoorSystem, buf: PolusBuffer, rm: Room, spawn: boolean, old: DoorSystem) => {
		if (!spawn) {
			let maskBuf = new PolusBuffer();
			let doorBuf = new PolusBuffer();
			let mask = 0;
			for (let i = 0; i < obj.Doors.length; i++) {
				doorBuf.writeBoolean(obj.Doors[i]);
				mask |= 2**(i)
			}
			maskBuf.writeVarInt(BigInt(mask));
			buf.writeBytes(maskBuf);
			buf.writeBytes(doorBuf);
		} else {
			for (let i = 0; i < obj.Doors.length; i++) {
				buf.writeBoolean(obj.Doors[i]);
			}
		}
	},
	check: (curr:DoorSystem, old:DoorSystem) => {
		return !arraysEqual(curr.Doors, old.Doors);
	}
});

/// *** Sabotage *** ///

SYSTEM_HANDLER.set(SystemType.Sabotage, {
	read: (buf, rm) => {
		return {
			Timer: buf.readFloat32()
		}
	},
	write: (obj: SabotageSystem, buf, rm) => {
		buf.writeFloat32(obj.Timer)
	},
	check: (curr: SabotageSystem, old: SabotageSystem) => {
		return curr.Timer !== old.Timer
	}
});

SYSTEM_HANDLER.set(SystemType.Laboratory, SYSTEM_HANDLER.get(SystemType.Reactor));

const MAP_SYSTEM_ORDER = [
	[
		SystemType.Reactor,
		SystemType.Electrical,
		SystemType.O2,
		SystemType.Medbay,
		SystemType.Security,
		SystemType.Communications,
		SystemType.Doors,
		SystemType.Sabotage
	],
	[
		SystemType.Reactor, 
		SystemType.Electrical, 
		SystemType.O2,
		SystemType.Medbay, 
		SystemType.Communications, 
		SystemType.Sabotage
	],
	[
		SystemType.Electrical, 
		SystemType.Medbay, 
		SystemType.Security, 
		SystemType.Communications, 
		SystemType.Doors, 
		SystemType.Sabotage, 
		SystemType.Laboratory
	]
]

export default class Component{
	public old: Component = undefined;
	public Data: ComponentData;
	public length: number;
	public netID: bigint;
	public flag: number;
	//if old, not spawn!

	constructor (private spawnId: bigint, public index: number, public room: Room) {}
	
	private readData(pb: PolusBuffer) {
		const spawn = !(this.old && this.old.Data);
		switch (Number(this.spawnId)){
			case ObjectType.HeadQuarters:
			case ObjectType.AprilShipStatus:
			case ObjectType.PlanetMap:
			case ObjectType.ShipStatus:
				const mapOrder = MAP_SYSTEM_ORDER[this.room.settings.Map === 7 ? 0 : this.room.settings.Map];
				const systems = Object.keys(SystemType).length/2;
				if(!(<ShipStatus>this.Data)) {
					this.Data = {
						systems: []
					}
				}
				if (spawn){
					for (let k of mapOrder){
						(<ShipStatus>this.Data).systems[k] = {
							system: k, 
							data: SYSTEM_HANDLER.get(k).read(pb, this.room, true)
						};
					}
				}else {
					const mask = Number(pb.readVarInt());
					for (let k of mapOrder){
						if ((mask & (1<<k)) != 0){
							(<ShipStatus>this.Data).systems[k] = {
								system: k,
								data: SYSTEM_HANDLER.get(k).read(pb, this.room, false)
							};
						}
					}
				}
				break;
			case ObjectType.Player:
				if(this.index == 0) {
					this.Data = {
						new: spawn ? pb.readBoolean() : false,
						id: pb.readU8()
					}
				}
				if(this.index == 2) {
					this.Data = {
						lastSequenceID: pb.readU16(),
						targetPosition: new Vector2().parse(pb),
						targetVelocity: new Vector2().parse(pb)
					}
				}
				break;
			case ObjectType.GameData:
				console.log(pb)
				if (this.index === 0) {
					let PlayerCount = spawn ? pb.readVarInt() : pb.readU8();
					let PlayerData: GameDataPlayerData;
					const gd: GameDataPlayerData[] = [];
					for (let i = 0; i < PlayerCount; i++) {
						PlayerData = {
							PlayerID: pb.readU8(),
							PlayerName: pb.readString(),
							Color: pb.readVarInt(),
							HatID: pb.readVarInt(),
							PetID: pb.readVarInt(),
							SkinID: pb.readVarInt(),
							Flags: { Dead: false, Impostor: false, Disconnected: false },
							Tasks: []
						};
						let FlagsBitfield = pb.readU8();
						PlayerData.Flags = {
							Disconnected: (FlagsBitfield & 0b00000001) != 0,
							Impostor: (FlagsBitfield & 0b00000010) != 0,
							Dead: (FlagsBitfield & 0b00000100) != 0
						}
						PlayerData.Tasks = Array(pb.readU8())
						for (let i2 = 0; i2 < PlayerData.Tasks.length; i2++) {
							PlayerData.Tasks[i2] = {
								TaskID: pb.readVarInt(),
								TaskCompleted: pb.readBoolean()
							}
						}
						console.log(PlayerData)
						gd.push(PlayerData);
					}
					(<GameData><unknown>(this.Data)) = {players: gd};
				}
				if (this.index === 1) {
					let o: PlayerVoteBanSystem = {
						Players: new Map()
					};
					let ArrLen = pb.readU8()
					for (let i = 0; i < ArrLen; i++) {
						let ClientID = pb.read32();
						if (ClientID == 0x00) break;
						if (!o.Players.has(ClientID)) {
							o.Players.set(ClientID, [
								pb.readVarInt(),
								pb.readVarInt(),
								pb.readVarInt(),
							])
						}
					}
					this.Data = o
				}
				break;
			case ObjectType.MeetingHud:
				const mh: MeetingHud = {players: []};
				for (let i = 0; i < this.length; i++) {
					mh.players[i] = StateByte.parse(pb.readU8());
				}
				this.Data = mh;
				break;
			case ObjectType.LobbyBehavior:
				//empty!
				break;
		}
	}

	private writeData(): PolusBuffer{
		const spawn = !(this.old && this.old.Data);
		const pb = new PolusBuffer();
		switch (Number(this.spawnId)){
			case ObjectType.HeadQuarters:
			case ObjectType.AprilShipStatus:
			case ObjectType.PlanetMap:
			case ObjectType.ShipStatus:
				const mapOrder = MAP_SYSTEM_ORDER[this.room.settings.Map === 7 ? 0 : this.room.settings.Map];
				if (spawn){
					let i=0;
					for (let k of mapOrder){
						let data = (<ShipStatus>this.Data).systems[k];
						SYSTEM_HANDLER.get(data.system).write(data.data, pb, this.room, true);
					}
				}else {
					let i=0;
					let mask = 0;
					let buffers: PolusBuffer[] = [new PolusBuffer()];
					for (let k of mapOrder){
						console.log("IMPORTANT!!LMAO", k);
						console.log(this.Data)
						// console.trace((<ShipStatus>this.Data).systems[k].data, (<ShipStatus>this.old.Data).systems[k].data)
						// console.log(SYSTEM_HANDLER.get(k).check((<ShipStatus>this.Data).systems[k].data, (<ShipStatus>this.old.Data).systems[k].data))
						// if (SYSTEM_HANDLER.get(k).check((<ShipStatus>this.Data).systems[k].data, (<ShipStatus>this.old.Data).systems[k].data)){
							let data = (<ShipStatus>this.Data).systems[k];
							let buf = new PolusBuffer();
							SYSTEM_HANDLER.get(k).write(data.data, buf, this.room, false, (<ShipStatus>this.old.Data).systems[k].data)
							buffers.push(buf);
							mask |= 1 << k;
						// }
					}
					buffers[0].writeVarInt(BigInt(mask));
					pb.writeBytes(PolusBuffer.concat(...buffers));
				}
				break;
			case ObjectType.Player:
				if (this.index == 0){
					let control = <PlayerControl> this.Data;
					if (!(this.old && this.old.Data)){
						pb.writeBoolean(control.new);
					}
					pb.writeU8(control.id)
				}
				else if(this.index == 2){
					let data = <CustomTransformData>this.Data;
					pb.writeU16(data.lastSequenceID);
					pb.writeBytes(data.targetPosition.serialize())
					pb.writeBytes(data.targetVelocity.serialize())
				}
				break;
			case ObjectType.GameData:
				if(this.index == 0) {
					pb.writeVarInt(BigInt((<GameData><unknown>this.Data).players.length));
					((<GameData><unknown>this.Data).players).forEach(player => {
						pb.writeU8(player.PlayerID);
						pb.writeString(player.PlayerName);
						pb.writeVarInt(player.Color);
						pb.writeVarInt(player.HatID);
						pb.writeVarInt(player.PetID);
						pb.writeVarInt(player.SkinID);
						let flags = 0;
						if (player.Flags.Disconnected) flags += 0b00000001
						if (player.Flags.Impostor) flags += 0b00000010
						if (player.Flags.Dead) flags += 0b00000100
						pb.writeU8(flags);
						pb.writeU8(player.Tasks.length);
						for (let i = 0; i < player.Tasks.length; i++) {
							const task = player.Tasks[i];
							pb.writeVarInt(task.TaskID)
							pb.writeBoolean(task.TaskCompleted)
						}
					})	
				}
				if(this.index == 1) {
					//@ts-ignore
					let playersarr = [...this.Data.Players.entries()];
					pb.writeU8(playersarr.length);
					playersarr.forEach(player => {
						pb.write32(player[0])
						pb.writeVarInt(player[1][0])
						pb.writeVarInt(player[1][1])
						pb.writeVarInt(player[1][2])
					})
				}
				break;
			case ObjectType.MeetingHud:
				let dirtyBits = this.calculateDirtyBits()
				for (let i = 0; i < (<MeetingHud>this.Data).players.length; i++) {
					if((Number(dirtyBits) & (1 << i)) != 0) {
						pb.writeU8(StateByte.serialize(<StateByteInterface>(<MeetingHud>this.Data).players[i]));
					}
				}
				break;
			case ObjectType.LobbyBehavior:
				//still empty :rolling_eyes:
				break;
		}
		return pb;
	}

	private calculateDirtyBits():number {
		if (!(this.old && this.old.Data)) {
			return 0xFFFFFFFF
		} else {
			switch (Number(this.spawnId)) {
				case ObjectType.HeadQuarters:
				case ObjectType.AprilShipStatus:
				case ObjectType.PlanetMap:
				case ObjectType.ShipStatus:
					throw new Error("calculateDirtyBits called while this.spawnID is typeof ObjectType.ShipStatus (or similar) this in unintended behavior, as for efficiency dirtybits are calculated inside the serializer")
					break;
				case ObjectType.Player:
					throw new Error("calculateDirtyBits called while this.spawnID is typeof ObjectType.Player")
				case ObjectType.GameData:
					throw new Error("calculateDirtyBits called while this.spawnID is typeof ObjectType.GameData")
				case ObjectType.MeetingHud:
					var num = 0;
					for (let i = 0; i < (<MeetingHud>this.Data).players.length; i++) {
						const current = (<MeetingHud>this.Data).players[i];
						const historical = (<MeetingHud>this.old.Data).players[i];
						i += 2**(shallowEqual(current, historical)?1:0);
					}
					return num;
			}
		}
	}

	parse(pb: PolusBuffer): Component{
		let newcomp = new Component(this.spawnId, this.index, this.room);
		if(this.old) {
			console.log("WOWEE", this.old)
			newcomp.netID = this.netID;
			newcomp.length = this.length;
			newcomp.flag = this.flag;
		} else {
			newcomp.netID = pb.readVarInt();
			newcomp.length = pb.readU16();
			newcomp.flag = pb.readU8();
		}
		newcomp.old = this;
		newcomp.Data = this.Data;
		newcomp.readData(pb.readBytes(Number(newcomp.length)));
		return newcomp;
	}

	serialize(): PolusBuffer{
		if(this.old && this.old.Data) {
			return this.writeData();
		} else {
			let pbmas = new PolusBuffer();
			pbmas.writeVarInt(this.netID);
			let pbsub = this.writeData()
			pbmas.writeU16(pbsub.length);
			pbmas.writeU8(this.flag)
			pbmas.writeBytes(pbsub);
			return pbmas;
		}
	}
}
