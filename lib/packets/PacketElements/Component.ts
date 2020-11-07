import SystemType from "./SystemType";
import Room from "../../util/Room";
import PolusBuffer from "../../util/PolusBuffer";
import AmongUsMap from "../../data/enums/AmongUsMap";
import { ObjectType } from "../Subpackets/GameDataPackets/Spawn";
import StateByte, { StateByteInterface } from "./StateByte";
import { ComponentData, MeetingHud, GameDataPlayerData, GameData, PlayerVoteBanSystem, ElectricalSystem, System, UserListSystem, CommsSystem, MiraCommsSystem, SimpleCommsSystem, O2System, DoorSystem, SabotageSystem, ReactorSystem, ShipStatus } from "./ComponentTypes";
import Vector2 from "./Vector2";

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

const SYSTEM_HANDLER: Map<SystemType, { read: (buf: PolusBuffer, rm: Room, spawn?: boolean) => System, write: (obj: System, buf: PolusBuffer, rm: Room, spawn?: boolean, old?: System) => void}> = new Map();

/// *** Electrical *** ///

SYSTEM_HANDLER.set(SystemType.Electrical, {
	read: (buf, rm) => {
		let expected = buf.readU8().toString(2).padStart(5, "0").split('').map(c => c == "1")
		let actual = buf.readU8().toString(2).padStart(5, "0").split('').map(c => c == "1")
		return {
			ExpectedSwitches: expected,
			ActualSwitches: actual,
			Value: buf.readU8() / 2.55
		};
	},
	write: (obj: ElectricalSystem, buf, rm) => {
		buf.writeU8(parseInt(obj.ExpectedSwitches.map((e: boolean) => e ? "1" : "0").join(''), 2));
		buf.writeU8(parseInt(obj.ActualSwitches.map((e: boolean) => e ? "1" : "0").join(''), 2));
		buf.writeU8(obj.Value * 2.55);
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
	}
});

/// *** Medbay *** ///

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
	}
});

/// *** O2 *** ///

SYSTEM_HANDLER.set(SystemType.O2, {
	read: (buf, rm) => {
		const Countdown = buf.readFloat32();
		const length = Number(buf.readVarInt());
		const consoles = [];
		for (let i = 0; i < length; i++) {
			consoles.push(buf.readU8());
		}
		return {
			Countdown,
			Consoles: consoles
		}
	},
	write: (obj: O2System, buf, rm) => {
		buf.writeFloat32(obj.Countdown);
		buf.writeVarInt(BigInt(obj.Consoles.length));
		for (let i = 0; i < obj.Consoles.length; i++) {
			buf.writeU8(obj.Consoles[i])
		}
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
	write: (obj: DoorSystem, buf, rm, spawn, old: DoorSystem) => {
		if (!spawn) {
			let maskBuf = new PolusBuffer();
			let doorBuf = new PolusBuffer();
			let mask = 0;
			for (let i = 0; i < obj.Doors.length; i++) {
				if (old.Doors[i] !== obj.Doors[i]){
					doorBuf.writeBoolean(obj.Doors[i]);
					mask |= 1 << i;
				}
			}
			maskBuf.writeVarInt(BigInt(mask));

		}else for (let i = 0; i < obj.Doors.length; i++) {
			buf.writeBoolean(obj.Doors[i]);
		}
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
	}
});

const MAP_SYSTEM_ORDER = [
	[
		SystemType.Reactor,
		SystemType.Electrical,
		SystemType.O2,
		SystemType.Medbay,
		SystemType.Security,
		SystemType.Communications,
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

	constructor (private spawnId: number, public index: number, public room: Room) {}
	
	private readData(pb: PolusBuffer) {
		const spawn = this.old === undefined;
		switch (this.spawnId){
			case ObjectType.HeadQuarters:
			case ObjectType.AprilShipStatus:
			case ObjectType.PlanetMap:
			case ObjectType.ShipStatus:
				const mapOrder = MAP_SYSTEM_ORDER[this.room.settings.Map === 7 ? 0 : this.room.settings.Map];
				const systems = Object.keys(SystemType).length/2;
				this.Data = {
					systems: []
				}
				if (spawn){
					let i=0;
					for (let j=0; j < systems; j++){
						for (let k of mapOrder){
							if (j == k){
								this.Data.systems[mapOrder[k]] = {
									system: i, 
									data: SYSTEM_HANDLER.get(i).read(pb, this.room, true)
								};
							}
						}
					}
				}else {
					let i=0;
					const mask = Number(pb.readVarInt());
					for (let j=0; j < systems; j++){
						for (let k of mapOrder){
							if (j == k && (mask & (1<<j)) != 0){
								this.Data.systems[mapOrder[k]] = {
									system: i,
									data: SYSTEM_HANDLER.get(i).read(pb, this.room, true)
								};
							}
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
		const spawn = this.old === undefined;
		const pb = new PolusBuffer();
		switch (this.spawnId){
			case ObjectType.HeadQuarters:
			case ObjectType.AprilShipStatus:
			case ObjectType.PlanetMap:
			case ObjectType.ShipStatus:
				const mapOrder = MAP_SYSTEM_ORDER[this.room.settings.Map === 7 ? 0 : this.room.settings.Map];
				const systems = Object.keys(SystemType).length/2;
				if (spawn){
					let i=0;
					for (let j=0; j < systems; j++){
						for (let k of mapOrder){
							if (j == k){
								let data = (<ShipStatus>this.Data).systems[mapOrder[i]]
								SYSTEM_HANDLER.get(data.system).write(data.data, pb, this.room, true, (<ShipStatus>this.old.Data).systems[i++].data);
							}
						}
					}
				}else {
					let i=0;
					let mask = 0;
					let buffers: PolusBuffer[] = [new PolusBuffer()];
					for (let j=0; j < systems; j++){
						for (let k of mapOrder){
							if (j == k){
								let x = i++;
								if ((j & (1 << 1)) != 0){
									(<ShipStatus>this.Data).systems[mapOrder[i]];
									SYSTEM_HANDLER.get(i).read(pb, this.room, true)
								}
							}
						}
					}
				}
				break;
			case ObjectType.Player:
				break;
			case ObjectType.GameData:
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
		if(this.old === undefined) {
			return 0xFFFFFFFF
		} else {
			switch(this.spawnId) {
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

	parse(pb: PolusBuffer){
		let newcomp = new Component(this.spawnId, this.index, this.room);
		if(this.old === undefined) {
			newcomp.netID = pb.readVarInt();
			newcomp.length = pb.readU16();
			newcomp.flag = pb.readU8();
		} else {
			newcomp.netID = this.netID;
			newcomp.length = this.length;
			newcomp.flag = this.flag;
		}
		newcomp.readData(pb);
		newcomp.old = this;
		return newcomp;
	}

	serialize(){
		const spawn = this.old === undefined;
		if(!spawn) {
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