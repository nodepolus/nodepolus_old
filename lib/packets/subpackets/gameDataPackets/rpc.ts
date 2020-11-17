import PolusBuffer from "../../../util/polusBuffer";

import { PlayAnimation, PlayAnimationPacket } from "./rpcPackets/playAnimation";
import { CompleteTask, CompleteTaskPacket } from "./rpcPackets/completeTask";
import { SyncSettings, SyncSettingsPacket } from "./rpcPackets/syncSettings";
import { SetInfected, SetInfectedPacket } from "./rpcPackets/setInfected";
import { CheckName, CheckNamePacket } from "./rpcPackets/checkName";
import { SetName, SetNamePacket } from "./rpcPackets/setName";
import { CheckColor, CheckColorPacket } from "./rpcPackets/checkColor";
import { SetColor, SetColorPacket } from "./rpcPackets/setColor";
import { SetHat, SetHatPacket } from "./rpcPackets/setHat";
import { SetSkin, SetSkinPacket } from "./rpcPackets/setSkin";
import {
  ReportDeadBody,
  ReportDeadBodyPacket,
} from "./rpcPackets/reportDeadBody";
import { MurderPlayer, MurderPlayerPacket } from "./rpcPackets/murderPlayer";
import { SendChat, SendChatPacket } from "./rpcPackets/sendChat";
import {
  CallEmergencyMeeting,
  CallEmergencyMeetingPacket,
} from "./rpcPackets/callEmergencyMeeting";
import { SetScanner, SetScannerPacket } from "./rpcPackets/setScanner";
import { SendChatNote, SendChatNotePacket } from "./rpcPackets/sendChatNote";
import { SetPet, SetPetPacket } from "./rpcPackets/setPet";
import {
  SetStartCounter,
  SetStartCounterPacket,
} from "./rpcPackets/setStartCounter";
import { EnterVent, EnterVentPacket } from "./rpcPackets/enterVent";
import { ExitVent, ExitVentPacket } from "./rpcPackets/exitVent";
import { SnapTo, SnapToPacket } from "./rpcPackets/snapTo";
import { VotingClosed, VotingClosedPacket } from "./rpcPackets/votingClosed";
import {
  VotingComplete,
  VotingCompletePacket,
} from "./rpcPackets/votingComplete";
import { CastVote, CastVotePacket } from "./rpcPackets/castVote";
import { ClearVote, ClearVotePacket } from "./rpcPackets/clearVote";
import { CastVoteKick, CastVoteKickPacket } from "./rpcPackets/castVoteKick";
import {
  CloseDoorsOfType,
  CloseDoorsOfTypePacket,
} from "./rpcPackets/closeDoorsOfType";
import {
  RepairSabotage,
  RepairSystemPacket as RepairSabotagePacket,
} from "./rpcPackets/repairSabotage";
import { SetTasks, SetTasksPacket } from "./rpcPackets/setTasks";
import {
  UpdateGameData,
  UpdateGameDataPacket,
} from "./rpcPackets/updateGameData";
import { Exiled } from "./rpcPackets/exiled";
import { GameDataPacketType } from "../gameData";
import { Room } from "../../../util/room";
import { PacketHandler } from "../../packet";

export type RPCPacketSubtype =
  | PlayAnimationPacket
  | CompleteTaskPacket
  | SyncSettingsPacket
  | SetInfectedPacket
  | CheckNamePacket
  | SetNamePacket
  | CheckColorPacket
  | SetColorPacket
  | SetHatPacket
  | SetSkinPacket
  | ReportDeadBodyPacket
  | MurderPlayerPacket
  | SendChatPacket
  | CallEmergencyMeetingPacket
  | SetScannerPacket
  | SendChatNotePacket
  | SetPetPacket
  | SetStartCounterPacket
  | EnterVentPacket
  | ExitVentPacket
  | SnapToPacket
  | VotingClosedPacket
  | VotingCompletePacket
  | CastVotePacket
  | ClearVotePacket
  | CastVoteKickPacket
  | CloseDoorsOfTypePacket
  | RepairSabotagePacket
  | SetTasksPacket
  | UpdateGameDataPacket;

export interface RPCPacket {
  type: GameDataPacketType.RPC;
  NetID: bigint;
  RPCFlag: RPCPacketType;
  Packet: RPCPacketSubtype;
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
  UpdateGameData = 0x1e,
}

const handlers: {
  [type: number]: PacketHandler<RPCPacketSubtype>;
} = {
  [RPCPacketType.PlayAnimation]: PlayAnimation,
  [RPCPacketType.CompleteTask]: CompleteTask,
  [RPCPacketType.SyncSettings]: SyncSettings,
  [RPCPacketType.SetInfected]: SetInfected,
  [RPCPacketType.Exiled]: Exiled,
  [RPCPacketType.CheckName]: CheckName,
  [RPCPacketType.SetName]: SetName,
  [RPCPacketType.CheckColor]: CheckColor,
  [RPCPacketType.SetColor]: SetColor,
  [RPCPacketType.SetHat]: SetHat,
  [RPCPacketType.SetSkin]: SetSkin,
  [RPCPacketType.ReportDeadBody]: ReportDeadBody,
  [RPCPacketType.MurderPlayer]: MurderPlayer,
  [RPCPacketType.SendChat]: SendChat,
  [RPCPacketType.CallEmergencyMeeting]: CallEmergencyMeeting,
  [RPCPacketType.SetScanner]: SetScanner,
  [RPCPacketType.SendChatNote]: SendChatNote,
  [RPCPacketType.SetPet]: SetPet,
  [RPCPacketType.SetStartCounter]: SetStartCounter,
  [RPCPacketType.EnterVent]: EnterVent,
  [RPCPacketType.ExitVent]: ExitVent,
  [RPCPacketType.SnapTo]: SnapTo,
  [RPCPacketType.VotingClosed]: VotingClosed,
  [RPCPacketType.VotingComplete]: VotingComplete,
  [RPCPacketType.CastVote]: CastVote,
  [RPCPacketType.ClearVote]: ClearVote,
  [RPCPacketType.CastVoteKick]: CastVoteKick,
  [RPCPacketType.CloseDoorsOfType]: CloseDoorsOfType,
  [RPCPacketType.RepairSabotage]: RepairSabotage,
  [RPCPacketType.SetTasks]: SetTasks,
  [RPCPacketType.UpdateGameData]: UpdateGameData,
};

export const RPC: PacketHandler<RPCPacket> = {
  parse(packet: PolusBuffer, room: Room): RPCPacket {
    const netId = packet.readVarInt();
    const rpcFlag = packet.readU8();

    const handler: PacketHandler<RPCPacketSubtype> | undefined =
      handlers[rpcFlag];

    if (!handler) {
      throw new Error("Could not find handler for RPC subtype: " + rpcFlag);
    }

    return {
      type: GameDataPacketType.RPC,
      NetID: netId,
      RPCFlag: rpcFlag,
      Packet: {
        RPCFlag: rpcFlag,
        ...handler.parse(packet, room),
      },
    };
  },

  serialize(packet: RPCPacket, room: Room): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeVarInt(packet.NetID);
    buf.writeU8(packet.RPCFlag);

    const handler: PacketHandler<RPCPacketSubtype> | undefined =
      handlers[packet.RPCFlag];

    if (!handler) {
      throw new Error(
        "Could not find handler for RPC subtype: " + packet.RPCFlag
      );
    }

    buf.writeBytes(handler.serialize(packet.Packet, room));
    return buf;
  },
};
