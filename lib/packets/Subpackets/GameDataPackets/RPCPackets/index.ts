import { PlayAnimation, PlayAnimationPacket } from './PlayAnimation'
import { CompleteTask, CompleteTaskPacket } from './CompleteTask'
import { SyncSettings, SyncSettingsPacket } from './SyncSettings'
import { SetInfected, SetInfectedPacket } from './SetInfected'
import { CheckName, CheckNamePacket } from './CheckName'
import { SetName, SetNamePacket } from './SetName'
import { CheckColor, CheckColorPacket } from './CheckColor'
import { SetColor, SetColorPacket } from './SetColor'
import { SetHat, SetHatPacket } from './SetHat'
import { SetSkin, SetSkinPacket } from './SetSkin'
import { ReportDeadBody, ReportDeadBodyPacket } from './ReportDeadBody'
import { MurderPlayer, MurderPlayerPacket } from './MurderPlayer'
import { SendChat, SendChatPacket } from './SendChat'
import { CallEmergencyMeeting, CallEmergencyMeetingPacket } from './CallEmergencyMeeting'
import { SetScanner, SetScannerPacket } from './SetScanner'
import { SendChatNote, SendChatNotePacket } from './SendChatNote'
import { SetPet, SetPetPacket } from './SetPet'
import { SetStartCounter, SetStartCounterPacket } from './SetStartCounter'
import { EnterVent, EnterVentPacket } from './EnterVent'
import { ExitVent, ExitVentPacket } from './ExitVent'
import { SnapTo, SnapToPacket } from './SnapTo'
import { VotingClosed, VotingClosedPacket } from './VotingClosed'
import { VotingComplete, VotingCompletePacket } from './VotingComplete'
import { CastVote, CastVotePacket } from './CastVote'
import { ClearVote, ClearVotePacket } from './ClearVote'
import { CastVoteKick, CastVoteKickPacket } from './CastVoteKick'
import { CloseDoorsOfType, CloseDoorsOfTypePacket } from './CloseDoorsOfType'
import { ReopenDoorAmount, RepairSystem, RepairSystemPacket as RepairSabotagePacket } from './RepairSabotage'
import { SetTasks, SetTasksPacket } from './SetTasks'
import { UpdateGameData, UpdateGameDataPacket } from './UpdateGameData'
import { SubpacketClass } from '../..'

export enum RPCPacketFlag {
	PlayAnimation = 0x00,
	CompleteTask = 0x01,
	SyncSettings = 0x02,
	SetInfected = 0x03,
	// Exiled = 0x04,
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

export type RPCPacketType =
  PlayAnimationPacket | 
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

export const rpcPacketHandlers: {
  [rpcFlag in keyof typeof RPCPacketFlag]: SubpacketClass<RPCPacketType>
} = {
  [RPCPacketFlag.PlayAnimation]: PlayAnimation,
  [RPCPacketFlag.CompleteTask]: CompleteTask,
  [RPCPacketFlag.SyncSettings]: SyncSettings,
  [RPCPacketFlag.SetInfected]: SetInfected,
  // [RPCPacketFlag.Exiled]: new Exiled(),
  [RPCPacketFlag.CheckName]: CheckName,
  [RPCPacketFlag.SetName]: SetName,
  [RPCPacketFlag.CheckColor]: CheckColor,
  [RPCPacketFlag.SetColor]: SetColor,
  [RPCPacketFlag.SetHat]: SetHat,
  [RPCPacketFlag.SetSkin]: SetSkin,
  [RPCPacketFlag.ReportDeadBody]: ReportDeadBody,
  [RPCPacketFlag.MurderPlayer]: MurderPlayer,
  [RPCPacketFlag.SendChat]: SendChat,
  [RPCPacketFlag.CallEmergencyMeeting]: CallEmergencyMeeting,
  [RPCPacketFlag.SetScanner]: SetScanner,
  [RPCPacketFlag.SendChatNote]: SendChatNote,
  [RPCPacketFlag.SetPet]: SetPet,
  [RPCPacketFlag.SetStartCounter]: SetStartCounter,
  [RPCPacketFlag.EnterVent]: EnterVent,
  [RPCPacketFlag.ExitVent]: ExitVent,
  [RPCPacketFlag.SnapTo]: SnapTo,
  [RPCPacketFlag.VotingClosed]: VotingClosed,
  [RPCPacketFlag.VotingComplete]: VotingComplete,
  [RPCPacketFlag.CastVote]: CastVote,
  [RPCPacketFlag.ClearVote]: ClearVote,
  [RPCPacketFlag.CastVoteKick]: CastVoteKick,
  [RPCPacketFlag.CloseDoorsOfType]: CloseDoorsOfType,
  [RPCPacketFlag.RepairSabotage]: RepairSystem,
  [RPCPacketFlag.SetTasks]: SetTasks,
  [RPCPacketFlag.UpdateGameData]: UpdateGameData
}
