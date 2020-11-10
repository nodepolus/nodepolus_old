import PolusBuffer from "../../util/PolusBuffer";
import AmongUsMap from "../../data/enums/AmongUsMap";
import Room from "../../util/Room";

export class RoomSettings {
	Length: number;
	Version: number;
	MaxPlayers: number;
	Language: number;
	Map: AmongUsMap;
	PlayerSpeedModifier: number;
	CrewLightModifier: number;
	ImpostorLightModifier: number;
	KillCooldown: number;
	CommonTasks: number;
	LongTasks: number;
	ShortTasks: number;
	EmergencyCount: number;
	ImpostorCount: number;
	KillDistance: number;
	DiscussionTime: number;
	VotingTime: number;
	isDefault: boolean;
	EmergencyCooldown?: number;
	ConfirmEjects?: boolean;
	VisualTasks?: boolean;
	AnonymousVoting?: boolean;
	TaskBarUpdates?: number;
	constructor(private room?:Room) {}
	serialize(): PolusBuffer {
		let buf;
		if(!this.Version) {
			this.Version = 1;
			if (this.EmergencyCooldown != undefined) this.Version++;
			if (this.ConfirmEjects != undefined) this.Version++;
			if (this.TaskBarUpdates != undefined) this.Version++;
		}
		switch (this.Version) {
			case 1:
				buf = new PolusBuffer(42);
				buf.writeU8(41);
				break;
			case 2:
				buf = new PolusBuffer(43);
				buf.writeU8(42);
				break;
			case 3:
				buf = new PolusBuffer(45);
				buf.writeU8(44);
				break;
			case 4:
				buf = new PolusBuffer(47);
				buf.writeU8(46);
				break;
		}
		buf.writeU8(this.Version);
		buf.writeU8(this.MaxPlayers);
		buf.writeU32(this.Language);
		buf.writeU8(this.Map);
		buf.writeFloat32(this.PlayerSpeedModifier);
		buf.writeFloat32(this.CrewLightModifier);
		buf.writeFloat32(this.ImpostorLightModifier);
		buf.writeFloat32(this.KillCooldown);
		buf.writeU8(this.CommonTasks);
		buf.writeU8(this.LongTasks);
		buf.writeU8(this.ShortTasks);
		buf.write32(this.EmergencyCount);
		buf.writeU8(this.ImpostorCount);
		buf.writeU8(this.KillDistance);
		buf.write32(this.DiscussionTime);
		buf.write32(this.VotingTime);
		buf.writeBoolean(this.isDefault);
		if (this.Version > 1) {
			buf.writeU8(this.EmergencyCooldown);
		}
		if (this.Version > 2) {
			buf.writeBoolean(this.ConfirmEjects);
			buf.writeBoolean(this.VisualTasks);
		}
		if (this.Version > 3) {
			buf.writeBoolean(this.AnonymousVoting);
			buf.writeU8(this.TaskBarUpdates);
		}
		return buf;
	}

	parse(buf: PolusBuffer) {
		this.Length = buf.readU8();
		this.Version = buf.readU8();
		this.MaxPlayers = buf.readU8();
		this.Language = buf.readU32();
		this.Map = buf.readU8();
		this.PlayerSpeedModifier = buf.readFloat32();
		this.CrewLightModifier = buf.readFloat32();
		this.ImpostorLightModifier = buf.readFloat32();
		this.KillCooldown = buf.readFloat32();
		this.CommonTasks = buf.readU8();
		this.LongTasks = buf.readU8();
		this.ShortTasks = buf.readU8();
		this.EmergencyCount = buf.read32();
		this.ImpostorCount = buf.readU8();
		this.KillDistance = buf.readU8();
		this.DiscussionTime = buf.read32();
		this.VotingTime = buf.read32();
		this.isDefault = buf.readBoolean();
		if (this.Version > 1) {
			this.EmergencyCooldown = buf.readU8();
		}
		if (this.Version > 2) {
			this.ConfirmEjects = buf.readBoolean();
			this.VisualTasks = buf.readBoolean();
		}
		if (this.Version > 3) {
			this.AnonymousVoting = buf.readBoolean();
			this.TaskBarUpdates = buf.readU8();
		}
	}
	public setMaxPlayers(maxPlayers: number) { 
		this.MaxPlayers = maxPlayers;
		this.room.syncSettings();
	}
	public setLanguage(language: number) {
		this.Language = language;
		this.room.syncSettings();

	}
	public setMap(map: AmongUsMap) {
		this.Map = map;
		this.room.syncSettings();

	}
	public setPlayerSpeedModifier(playerSpeedModifier: number) {
		this.PlayerSpeedModifier = playerSpeedModifier;
		this.room.syncSettings();

	}
	public setCrewLightModifier(crewLightModifier: number) {
		this.CrewLightModifier = crewLightModifier;
		this.room.syncSettings();

	}
	public setImpostorLightModifier(impostorLightModifier: number) {
		this.MaxPlayers = impostorLightModifier;
		this.room.syncSettings();
		
	}
	public setKillCooldown(killCooldown: number) {
		this.KillCooldown = killCooldown;
		this.room.syncSettings();

	}
	public setCommonTasks(commonTasks: number) {
		this.CommonTasks = commonTasks;
		this.room.syncSettings();

	}
	public setLongTasks(longTasks: number) {
		this.LongTasks = longTasks;
		this.room.syncSettings();

	}
	public setShortTasks(shortTasks: number) {
		this.ShortTasks = shortTasks;
		this.room.syncSettings();

	}
	public setEmergencyCount(emergencyCount: number) {
		this.EmergencyCount = emergencyCount;
		this.room.syncSettings();

	}
	public setImpostorCount(impostorCount: number) {
		this.ImpostorCount = impostorCount;
		this.room.syncSettings();

	}
	public setKillDistance(killDistance: number) {
		this.KillDistance = killDistance;
		this.room.syncSettings();

	}
	public setDiscussionTime(discussionTime: number) {
		this.DiscussionTime = discussionTime;
		this.room.syncSettings();

	}
	public setVotingTime(votingTime: number) {
		this.VotingTime = votingTime;
		this.room.syncSettings();

	}
	public setIsDefault(isDefault: boolean) {
		this.isDefault = isDefault;
		this.room.syncSettings();

	}
	public setEmergencyCooldown(emergencyCooldown: number) {
		this.EmergencyCooldown = emergencyCooldown;
		this.room.syncSettings();

	}
	public setConfirmEjects(confirmEjects: boolean) {
		this.ConfirmEjects = confirmEjects;
		this.room.syncSettings();

	}
	public setVisualTasks(visualTasks: boolean) {
		this.VisualTasks = visualTasks;
		this.room.syncSettings();

	}
	public setAnonymousVoting(anonymousVoting: boolean) {
		this.AnonymousVoting = anonymousVoting;
		this.room.syncSettings();

	}
	public setTaskBarUpdates(taskBarUpdates: 1 | 2 | 3) {
		this.TaskBarUpdates = taskBarUpdates;
		this.room.syncSettings();

	}
}

export default RoomSettings;