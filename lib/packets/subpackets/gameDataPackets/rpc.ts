import PolusBuffer from '../../../util/polusBuffer'

import { PlayAnimation, PlayAnimationPacket } from './rpcPackets/playAnimation'
import { CompleteTask, CompleteTaskPacket } from './rpcPackets/completeTask'
import { SyncSettings, SyncSettingsPacket } from './rpcPackets/syncSettings'
import { SetInfected, SetInfectedPacket } from './rpcPackets/setInfected'
import { CheckName, CheckNamePacket } from './rpcPackets/checkName'
import { SetName, SetNamePacket } from './rpcPackets/setName'
import { CheckColor, CheckColorPacket } from './rpcPackets/checkColor'
import { SetColor, SetColorPacket } from './rpcPackets/setColor'
import { SetHat, SetHatPacket } from './rpcPackets/setHat'
import { SetSkin, SetSkinPacket } from './rpcPackets/setSkin'
import { ReportDeadBody, ReportDeadBodyPacket } from './rpcPackets/reportDeadBody'
import { MurderPlayer, MurderPlayerPacket } from './rpcPackets/murderPlayer'
import { SendChat, SendChatPacket } from './rpcPackets/sendChat'
import { CallEmergencyMeeting, CallEmergencyMeetingPacket } from './rpcPackets/callEmergencyMeeting'
import { SetScanner, SetScannerPacket } from './rpcPackets/setScanner'
import { SendChatNote, SendChatNotePacket } from './rpcPackets/sendChatNote'
import { SetPet, SetPetPacket } from './rpcPackets/setPet'
import { SetStartCounter, SetStartCounterPacket } from './rpcPackets/setStartCounter'
import { EnterVent, EnterVentPacket } from './rpcPackets/enterVent'
import { ExitVent, ExitVentPacket } from './rpcPackets/exitVent'
import { SnapTo, SnapToPacket } from './rpcPackets/snapTo'
import { VotingClosed, VotingClosedPacket } from './rpcPackets/votingClosed'
import { VotingComplete, VotingCompletePacket } from './rpcPackets/votingComplete'
import { CastVote, CastVotePacket } from './rpcPackets/castVote'
import { ClearVote, ClearVotePacket } from './rpcPackets/clearVote'
import { CastVoteKick, CastVoteKickPacket } from './rpcPackets/castVoteKick'
import { CloseDoorsOfType, CloseDoorsOfTypePacket } from './rpcPackets/closeDoorsOfType'
import { RepairSabotage, RepairSystemPacket as RepairSabotagePacket } from './rpcPackets/repairSabotage'
import { SetTasks, SetTasksPacket } from './rpcPackets/setTasks'
import { UpdateGameData, UpdateGameDataPacket } from './rpcPackets/updateGameData'
import { GameDataPacketType } from '../gameData'
import { Room } from '../../../util/room'
import { PacketHandler } from '../../packet'

export interface RPCPacket {
  type: GameDataPacketType.RPC,
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

export enum RPCPacketType {
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

export const RPC: PacketHandler<RPCPacket> = {
	parse(packet: PolusBuffer, room: Room): RPCPacket {
    const netId = packet.readVarInt()
    const rpcFlag = packet.readU8()

		let data: RPCPacket = {
      type: GameDataPacketType.RPC,
			NetID: netId,
			RPCFlag: rpcFlag,
			Packet: {}
    };

		switch (data.RPCFlag) {
			case RPCPacketType.PlayAnimation:
				data.Packet = { RPCFlag: data.RPCFlag, ...PlayAnimation.parse(packet, room) }
				return data;
			case RPCPacketType.CompleteTask:
				data.Packet = { RPCFlag: data.RPCFlag, ...CompleteTask.parse(packet, room) }
				return data;
			case RPCPacketType.SyncSettings:
				data.Packet = { RPCFlag: data.RPCFlag, ...SyncSettings.parse(packet, room) }
				return data;
			case RPCPacketType.SetInfected:
				data.Packet = { RPCFlag: data.RPCFlag, ...SetInfected.parse(packet, room) }
				return data;
			case RPCPacketType.Exiled:
				throw new Error("Exiled packets aren't used.")
				return data;
			case RPCPacketType.CheckName:
				data.Packet = { RPCFlag: data.RPCFlag, ...CheckName.parse(packet, room) }
				return data;
			case RPCPacketType.SetName:
				data.Packet = { RPCFlag: data.RPCFlag, ...SetName.parse(packet, room) }
				return data;
			case RPCPacketType.CheckColor:
				data.Packet = { RPCFlag: data.RPCFlag, ...CheckColor.parse(packet, room) }
				return data;
			case RPCPacketType.SetColor:
				data.Packet = { RPCFlag: data.RPCFlag, ...SetColor.parse(packet, room) }
				return data;
			case RPCPacketType.SetHat:
				data.Packet = { RPCFlag: data.RPCFlag, ...SetHat.parse(packet, room) }
				return data;
			case RPCPacketType.SetSkin:
				data.Packet = { RPCFlag: data.RPCFlag, ...SetSkin.parse(packet, room) }
				return data;
			case RPCPacketType.ReportDeadBody:
				data.Packet = { RPCFlag: data.RPCFlag, ...ReportDeadBody.parse(packet, room) }
				return data;
			case RPCPacketType.MurderPlayer:
				data.Packet = { RPCFlag: data.RPCFlag, ...MurderPlayer.parse(packet, room) }
				return data;
			case RPCPacketType.SendChat:
				data.Packet = { RPCFlag: data.RPCFlag, ...SendChat.parse(packet, room) }
				return data;
			case RPCPacketType.CallEmergencyMeeting:
				data.Packet = { RPCFlag: data.RPCFlag, ...CallEmergencyMeeting.parse(packet, room) }
				return data;
			case RPCPacketType.SetScanner:
				data.Packet = { RPCFlag: data.RPCFlag, ...SetScanner.parse(packet, room) }
				return data;
			case RPCPacketType.SendChatNote:
				data.Packet = { RPCFlag: data.RPCFlag, ...SendChatNote.parse(packet, room) }
				return data;
			case RPCPacketType.SetPet:
				data.Packet = { RPCFlag: data.RPCFlag, ...SetPet.parse(packet, room) }
				return data;
			case RPCPacketType.SetStartCounter:
				data.Packet = { RPCFlag: data.RPCFlag, ...SetStartCounter.parse(packet, room) }
				return data;
			case RPCPacketType.EnterVent:
				data.Packet = { RPCFlag: data.RPCFlag, ...EnterVent.parse(packet, room) }
				return data;
			case RPCPacketType.ExitVent:
				data.Packet = { RPCFlag: data.RPCFlag, ...ExitVent.parse(packet, room) }
				return data;
			case RPCPacketType.SnapTo:
				data.Packet = { RPCFlag: data.RPCFlag, ...SnapTo.parse(packet, room) }
				return data;
			case RPCPacketType.VotingClosed:
				data.Packet = { RPCFlag: data.RPCFlag, ...VotingClosed.parse(packet, room) }
				return data;
			case RPCPacketType.VotingComplete:
				data.Packet = { RPCFlag: data.RPCFlag, ...VotingComplete.parse(packet, room) }
				return data;
			case RPCPacketType.CastVote:
				data.Packet = { RPCFlag: data.RPCFlag, ...CastVote.parse(packet, room) }
				return data;
			case RPCPacketType.ClearVote:
				data.Packet = { RPCFlag: data.RPCFlag, ...ClearVote.parse(packet, room) }
				return data;
			case RPCPacketType.CastVoteKick:
				data.Packet = { RPCFlag: data.RPCFlag, ...CastVoteKick.parse(packet, room) }
				return data;
			case RPCPacketType.CloseDoorsOfType:
				data.Packet = { RPCFlag: data.RPCFlag, ...CloseDoorsOfType.parse(packet, room) }
				return data;
			case RPCPacketType.RepairSabotage:
				data.Packet = { RPCFlag: data.RPCFlag, ...RepairSabotage.parse(packet, room) }
				return data;
			case RPCPacketType.SetTasks:
				data.Packet = { RPCFlag: data.RPCFlag, ...SetTasks.parse(packet, room) }
				return data;
			case RPCPacketType.UpdateGameData:
				data.Packet = { RPCFlag: data.RPCFlag, ...UpdateGameData.parse(packet, room) }
				return data;
		}
	},

	serialize(packet: RPCPacket, room: Room): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.NetID);
		buf.writeU8(packet.RPCFlag);
		switch(packet.RPCFlag) {
			case RPCPacketType.PlayAnimation:
				buf.writeBytes(PlayAnimation.serialize(<PlayAnimationPacket>packet.Packet, room))
				break;
			case RPCPacketType.CompleteTask:
				buf.writeBytes(CompleteTask.serialize(<CompleteTaskPacket>packet.Packet, room))
				break;
			case RPCPacketType.SyncSettings:
				buf.writeBytes(SyncSettings.serialize(<SyncSettingsPacket>packet.Packet, room))
				break;
			case RPCPacketType.SetInfected:
				buf.writeBytes(SetInfected.serialize(<SetInfectedPacket>packet.Packet, room))
				break;
			case RPCPacketType.Exiled:
				throw new Error("Exiled packets aren't used.")
				break;
			case RPCPacketType.CheckName:
				buf.writeBytes(CheckName.serialize(<CheckNamePacket>packet.Packet, room))
				break;
			case RPCPacketType.SetName:
				buf.writeBytes(SetName.serialize(<SetNamePacket>packet.Packet, room))
				break;
			case RPCPacketType.CheckColor:
				buf.writeBytes(CheckColor.serialize(<CheckColorPacket>packet.Packet, room))
				break;
			case RPCPacketType.SetColor:
				buf.writeBytes(SetColor.serialize(<SetColorPacket>packet.Packet, room))
				break;
			case RPCPacketType.SetHat:
				buf.writeBytes(SetHat.serialize(<SetHatPacket>packet.Packet, room))
				break;
			case RPCPacketType.SetSkin:
				buf.writeBytes(SetSkin.serialize(<SetSkinPacket>packet.Packet, room))
				break;
			case RPCPacketType.ReportDeadBody:
				buf.writeBytes(ReportDeadBody.serialize(<ReportDeadBodyPacket>packet.Packet, room))
				break;
			case RPCPacketType.MurderPlayer:
				buf.writeBytes(MurderPlayer.serialize(<MurderPlayerPacket>packet.Packet, room))
				break;
			case RPCPacketType.SendChat:
				buf.writeBytes(SendChat.serialize(<SendChatPacket>packet.Packet, room))
				break;
			case RPCPacketType.CallEmergencyMeeting:
				buf.writeBytes(CallEmergencyMeeting.serialize(<CallEmergencyMeetingPacket>packet.Packet, room))
				break;
			case RPCPacketType.SetScanner:
				buf.writeBytes(SetScanner.serialize(<SetScannerPacket>packet.Packet, room))
				break;
			case RPCPacketType.SendChatNote:
				buf.writeBytes(SendChatNote.serialize(<SendChatNotePacket>packet.Packet, room))
				break;
			case RPCPacketType.SetPet:
				buf.writeBytes(SetPet.serialize(<SetPetPacket>packet.Packet, room))
				break;
			case RPCPacketType.SetStartCounter:
				buf.writeBytes(SetStartCounter.serialize(<SetStartCounterPacket>packet.Packet, room))
				break;
			case RPCPacketType.EnterVent:
				buf.writeBytes(EnterVent.serialize(<EnterVentPacket>packet.Packet, room))
				break;
			case RPCPacketType.ExitVent:
				buf.writeBytes(ExitVent.serialize(<ExitVentPacket>packet.Packet, room))
				break;
			case RPCPacketType.SnapTo:
				buf.writeBytes(SnapTo.serialize(<SnapToPacket>packet.Packet, room))
				break;
			case RPCPacketType.VotingClosed:
				buf.writeBytes(VotingClosed.serialize(<VotingClosedPacket>packet.Packet, room))
				break;
			case RPCPacketType.VotingComplete:
				buf.writeBytes(VotingComplete.serialize(<VotingCompletePacket>packet.Packet, room))
				break;
			case RPCPacketType.CastVote:
				buf.writeBytes(CastVote.serialize(<CastVotePacket>packet.Packet, room))
				break;
			case RPCPacketType.ClearVote:
				buf.writeBytes(ClearVote.serialize(<ClearVotePacket>packet.Packet, room))
				break;
			case RPCPacketType.CastVoteKick:
				buf.writeBytes(CastVoteKick.serialize(<CastVoteKickPacket>packet.Packet, room))
				break;
			case RPCPacketType.CloseDoorsOfType:
				buf.writeBytes(CloseDoorsOfType.serialize(<CloseDoorsOfTypePacket>packet.Packet, room))
				break;
			case RPCPacketType.RepairSabotage:
				buf.writeBytes(RepairSabotage.serialize(<RepairSabotagePacket>packet.Packet, room))
				break;
			case RPCPacketType.SetTasks:
				buf.writeBytes(SetTasks.serialize(<SetTasksPacket>packet.Packet, room))
				break;
			case RPCPacketType.UpdateGameData:
				buf.writeBytes(UpdateGameData.serialize(<UpdateGameDataPacket>packet.Packet, room))
				break;
		}
		return buf;
	}
}
