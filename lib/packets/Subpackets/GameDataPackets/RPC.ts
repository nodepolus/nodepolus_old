import PolusBuffer from "../../../util/PolusBuffer.js";

import PlayAnimation, { PlayAnimationPacket } from "./RPCPackets/PlayAnimation.js";
import CompleteTask, { CompleteTaskPacket } from "./RPCPackets/CompleteTask.js";
import SyncSettings, { SyncSettingsPacket } from "./RPCPackets/SyncSettings.js";
import SetInfected, { SetInfectedPacket } from "./RPCPackets/SetInfected.js";
import CheckName, { CheckNamePacket } from "./RPCPackets/CheckName.js";
import SetName, { SetNamePacket } from "./RPCPackets/SetName.js";
import CheckColor, { CheckColorPacket } from "./RPCPackets/CheckColor.js";
import SetColor, { SetColorPacket } from "./RPCPackets/SetColor.js";
import SetHat, { SetHatPacket } from "./RPCPackets/SetHat.js";
import SetSkin, { SetSkinPacket } from "./RPCPackets/SetSkin.js";
import ReportDeadBody, { ReportDeadBodyPacket } from "./RPCPackets/ReportDeadBody.js";
import MurderPlayer, { MurderPlayerPacket } from "./RPCPackets/MurderPlayer.js";
import SendChat, { SendChatPacket } from "./RPCPackets/SendChat.js";
import CallEmergencyMeeting, { CallEmergencyMeetingPacket } from "./RPCPackets/CallEmergencyMeeting.js";
import SetScanner, { SetScannerPacket } from "./RPCPackets/SetScanner.js";
import SendChatNote, { SendChatNotePacket } from "./RPCPackets/SendChatNote.js";
import SetPet, { SetPetPacket } from "./RPCPackets/SetPet.js";
import SetStartCounter, { SetStartCounterPacket } from "./RPCPackets/SetStartCounter.js";
import EnterVent, { EnterVentPacket } from "./RPCPackets/EnterVent.js";
import ExitVent, { ExitVentPacket } from "./RPCPackets/ExitVent.js";
import SnapTo, { SnapToPacket } from "./RPCPackets/SnapTo.js";
import VotingClosed, { VotingClosedPacket } from "./RPCPackets/VotingClosed.js";
import VotingComplete, { VotingCompletePacket } from "./RPCPackets/VotingComplete.js";
import CastVote, { CastVotePacket } from "./RPCPackets/CastVote.js";
import ClearVote, { ClearVotePacket } from "./RPCPackets/ClearVote.js";
import CastVoteKick, { CastVoteKickPacket } from "./RPCPackets/CastVoteKick.js";
import CloseDoorsOfType, { CloseDoorsOfTypePacket } from "./RPCPackets/CloseDoorsOfType.js";
import RepairSabotage, { RepairSystemPacket as RepairSabotagePacket } from "./RPCPackets/RepairSabotage.js";
import SetTasks, { SetTasksPacket } from "./RPCPackets/SetTasks.js";
import UpdateGameData, { UpdateGameDataPacket } from "./RPCPackets/UpdateGameData.js";

export interface RPCPacket {
	NetID: bigint,
	RPCFlag: RPCPacketType,
	Packet: PlayAnimationPacket | 
			CompleteTaskPacket | 
			SyncSettingsPacket | 
			SetInfectedPacket | 
			CheckNamePacket |
			SetNamePacket |
			CheckColorPacket |
			SetColorPacket |
			SetHatPacket |
			SetSkinPacket |
			ReportDeadBodyPacket |
			MurderPlayerPacket |
			SendChatPacket |
			CallEmergencyMeetingPacket |
			SetScannerPacket |
			SendChatNotePacket |
			SetPetPacket |
			SetStartCounterPacket |
			EnterVentPacket |
			ExitVentPacket |
			SnapToPacket |
			VotingClosedPacket |
			VotingCompletePacket |
			CastVotePacket |
			ClearVotePacket |
			CastVoteKickPacket |
			CloseDoorsOfTypePacket |
			RepairSabotagePacket |
			SetTasksPacket |
			UpdateGameDataPacket
}

enum RPCPacketType {
	PlayAnimation = 0x00,
	CompleteTask = 0x01,
	SyncSettings = 0x02,
	SetInfected = 0x03,
	Exiled = 0x04,
	CheckName = 0x05,
	SetName = 0x06,
	CheckColor = 0x07,
	SetColor = 0x08,
	SetHat = 0x09,
	SetSkin = 0x0a,
	ReportDeadBody = 0x0b,
	MurderPlayer = 0x0c,
	SendChat = 0x0d,
	CallEmergencyMeeting = 0x0e,
	SetScanner = 0x0f,
	SendChatNote = 0x10,
	SetPet = 0x11,
	SetStartCounter = 0x12,
	EnterVent = 0x13,
	ExitVent = 0x14,
	SnapTo = 0x15,
	VotingClosed = 0x16,
	VotingComplete = 0x17,
	CastVote = 0x18,
	ClearVote = 0x19,
	CastVoteKick = 0x1a,
	CloseDoorsOfType = 0x1b,
	RepairSabotage = 0x1c,
	SetTasks = 0x1d,
	UpdateGameData = 0x1e
}

export default class GameData {
	constructor() { }
	PlayAnimationPacketHandler = new PlayAnimation();
	CompleteTaskPacketHandler = new CompleteTask();
	SyncSettingsPacketHandler = new SyncSettings();
	SetInfectedPacketHandler = new SetInfected();
	CheckNamePacketHandler = new CheckName();
	SetNamePacketHandler = new SetName();
	CheckColorPacketHandler = new CheckColor();
	SetColorPacketHandler = new SetColor();
	SetHatPacketHandler = new SetHat();
	SetSkinPacketHandler = new SetSkin();
	ReportDeadBodyPacketHandler = new ReportDeadBody();
	MurderPlayerPacketHandler = new MurderPlayer();
	SendChatPacketHandler = new SendChat();
	CallEmergencyMeetingPacketHandler = new CallEmergencyMeeting();
	SetScannerPacketHandler = new SetScanner();
	SendChatNotePacketHandler = new SendChatNote();
	SetPetPacketHandler = new SetPet();
	SetStartCounterPacketHandler = new SetStartCounter();
	EnterVentPacketHandler = new EnterVent();
	ExitVentPacketHandler = new ExitVent();
	SnapToPacketHandler = new SnapTo();
	VotingClosedPacketHandler = new VotingClosed();
	VotingCompletePacketHandler = new VotingComplete();
	CastVotePacketHandler = new CastVote();
	ClearVotePacketHandler = new ClearVote();
	CastVoteKickPacketHandler = new CastVoteKick();
	CloseDoorsOfTypePacketHandler = new CloseDoorsOfType();
	RepairSabotagePacketHandler = new RepairSabotage();
	SetTasksPacketHandler = new SetTasks();
	UpdateGameDataPacketHandler = new UpdateGameData();

	parse(packet: PolusBuffer): RPCPacket {
		let data: RPCPacket = {
			NetID: -1n,
			RPCFlag: -1,
			Packet: {}
		};
		data.NetID = packet.readVarInt();
		data.RPCFlag = packet.readU8();
		switch (data.RPCFlag) {
			case RPCPacketType.PlayAnimation:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.PlayAnimationPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.CompleteTask:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.CompleteTaskPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SyncSettings:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SyncSettingsPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SetInfected:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SetInfectedPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.Exiled:
				throw new Error("Exiled packets aren't used.")
				return data;
			case RPCPacketType.CheckName:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.CheckNamePacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SetName:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SetNamePacketHandler.parse(packet) }
				return data;
			case RPCPacketType.CheckColor:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.CheckColorPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SetColor:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SetColorPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SetHat:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SetHatPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SetSkin:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SetSkinPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.ReportDeadBody:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.ReportDeadBodyPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.MurderPlayer:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.MurderPlayerPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SendChat:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SendChatPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.CallEmergencyMeeting:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.CallEmergencyMeetingPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SetScanner:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SetScannerPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SendChatNote:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SendChatNotePacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SetPet:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SetPetPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SetStartCounter:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SetStartCounterPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.EnterVent:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.EnterVentPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.ExitVent:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.ExitVentPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SnapTo:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SnapToPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.VotingClosed:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.VotingClosedPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.VotingComplete:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.VotingCompletePacketHandler.parse(packet) }
				return data;
			case RPCPacketType.CastVote:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.CastVotePacketHandler.parse(packet) }
				return data;
			case RPCPacketType.ClearVote:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.ClearVotePacketHandler.parse(packet) }
				return data;
			case RPCPacketType.CastVoteKick:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.CastVoteKickPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.CloseDoorsOfType:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.CloseDoorsOfTypePacketHandler.parse(packet) }
				return data;
			case RPCPacketType.RepairSabotage:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.RepairSabotagePacketHandler.parse(packet) }
				return data;
			case RPCPacketType.SetTasks:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.SetTasksPacketHandler.parse(packet) }
				return data;
			case RPCPacketType.UpdateGameData:
				data.Packet = { RPCFlag: data.RPCFlag, ...this.UpdateGameDataPacketHandler.parse(packet) }
				return data;
		}
	}

	serialize(packet: RPCPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.NetID);
		buf.writeU8(packet.RPCFlag);
		switch(packet.RPCFlag) {
			case RPCPacketType.PlayAnimation:
				buf.writeBytes(this.PlayAnimationPacketHandler.serialize(<PlayAnimationPacket>packet.Packet))
				break;
			case RPCPacketType.CompleteTask:
				buf.writeBytes(this.CompleteTaskPacketHandler.serialize(<CompleteTaskPacket>packet.Packet))
				break;
			case RPCPacketType.SyncSettings:
				buf.writeBytes(this.SyncSettingsPacketHandler.serialize(<SyncSettingsPacket>packet.Packet))
				break;
			case RPCPacketType.SetInfected:
				buf.writeBytes(this.SetInfectedPacketHandler.serialize(<SetInfectedPacket>packet.Packet))
				break;
			case RPCPacketType.Exiled:
				throw new Error("Exiled packets aren't used.")
				break;
			case RPCPacketType.CheckName:
				buf.writeBytes(this.CheckNamePacketHandler.serialize(<CheckNamePacket>packet.Packet))
				break;
			case RPCPacketType.SetName:
				buf.writeBytes(this.SetNamePacketHandler.serialize(<SetNamePacket>packet.Packet))
				break;
			case RPCPacketType.CheckColor:
				buf.writeBytes(this.CheckColorPacketHandler.serialize(<CheckColorPacket>packet.Packet))
				break;
			case RPCPacketType.SetColor:
				buf.writeBytes(this.CheckColorPacketHandler.serialize(<SetColorPacket>packet.Packet))
				break;
			case RPCPacketType.SetHat:
				buf.writeBytes(this.SetHatPacketHandler.serialize(<SetHatPacket>packet.Packet))
				break;
			case RPCPacketType.SetSkin:
				buf.writeBytes(this.SetSkinPacketHandler.serialize(<SetSkinPacket>packet.Packet))
				break;
			case RPCPacketType.ReportDeadBody:
				buf.writeBytes(this.ReportDeadBodyPacketHandler.serialize(<ReportDeadBodyPacket>packet.Packet))
				break;
			case RPCPacketType.MurderPlayer:
				buf.writeBytes(this.MurderPlayerPacketHandler.serialize(<MurderPlayerPacket>packet.Packet))
				break;
			case RPCPacketType.SendChat:
				buf.writeBytes(this.SendChatPacketHandler.serialize(<SendChatPacket>packet.Packet))
				break;
			case RPCPacketType.CallEmergencyMeeting:
				buf.writeBytes(this.CallEmergencyMeetingPacketHandler.serialize(<CallEmergencyMeetingPacket>packet.Packet))
				break;
			case RPCPacketType.SetScanner:
				buf.writeBytes(this.SetScannerPacketHandler.serialize(<SetScannerPacket>packet.Packet))
				break;
			case RPCPacketType.SendChatNote:
				buf.writeBytes(this.SetScannerPacketHandler.serialize(<SetScannerPacket>packet.Packet))
				break;
			case RPCPacketType.SetPet:
				buf.writeBytes(this.SetPetPacketHandler.serialize(<SetPetPacket>packet.Packet))
				break;
			case RPCPacketType.SetStartCounter:
				buf.writeBytes(this.SetStartCounterPacketHandler.serialize(<SetStartCounterPacket>packet.Packet))
				break;
			case RPCPacketType.EnterVent:
				buf.writeBytes(this.EnterVentPacketHandler.serialize(<EnterVentPacket>packet.Packet))
				break;
			case RPCPacketType.ExitVent:
				buf.writeBytes(this.ExitVentPacketHandler.serialize(<ExitVentPacket>packet.Packet))
				break;
			case RPCPacketType.SnapTo:
				buf.writeBytes(this.SnapToPacketHandler.serialize(<SnapToPacket>packet.Packet))
				break;
			case RPCPacketType.VotingClosed:
				buf.writeBytes(this.VotingClosedPacketHandler.serialize(<VotingClosedPacket>packet.Packet))
				break;
			case RPCPacketType.VotingComplete:
				buf.writeBytes(this.VotingCompletePacketHandler.serialize(<VotingCompletePacket>packet.Packet))
				break;
			case RPCPacketType.CastVote:
				buf.writeBytes(this.CastVotePacketHandler.serialize(<CastVotePacket>packet.Packet))
				break;
			case RPCPacketType.ClearVote:
				buf.writeBytes(this.ClearVotePacketHandler.serialize(<ClearVotePacket>packet.Packet))
				break;
			case RPCPacketType.CastVoteKick:
				buf.writeBytes(this.CastVoteKickPacketHandler.serialize(<CastVoteKickPacket>packet.Packet))
				break;
			case RPCPacketType.CloseDoorsOfType:
				buf.writeBytes(this.CloseDoorsOfTypePacketHandler.serialize(<CloseDoorsOfTypePacket>packet.Packet))
				break;
			case RPCPacketType.RepairSabotage:
				buf.writeBytes(this.RepairSabotagePacketHandler.serialize(<RepairSabotagePacket>packet.Packet))
				break;
			case RPCPacketType.SetTasks:
				buf.writeBytes(this.SetTasksPacketHandler.serialize(<SetTasksPacket>packet.Packet))
				break;
			case RPCPacketType.UpdateGameData:
				buf.writeBytes(this.UpdateGameDataPacketHandler.serialize(<UpdateGameDataPacket>packet.Packet))
				break;
		}
		return buf;
	}
};