import PolusBuffer from '../../../util/PolusBuffer'
import Room from '../../../util/Room'

import { GameDataPacketType } from '../GameData'
import { SubpacketClass } from '..'

import { RPCPacketType, RPCPacketFlag, rpcPacketHandlers } from './RPCPackets'

export interface RPCPacket {
  type: GameDataPacketType.RPC,
	NetID: bigint,
	RPCFlag: RPCPacketFlag,
	Packet: RPCPacketType
}

export const RPC: SubpacketClass<RPCPacket> = {
	parse(packet: PolusBuffer, room: Room): RPCPacket {
		let data: RPCPacket = {
      type: GameDataPacketType.RPC,
			NetID: -1n,
			RPCFlag: -1,
			Packet: {}
		};
		data.NetID = packet.readVarInt();
		data.RPCFlag = packet.readU8();
		switch (data.RPCFlag) {
			case RPCPacketFlag.PlayAnimation:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.PlayAnimation.parse(packet, room) }
				return data;
			case RPCPacketFlag.CompleteTask:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.CompleteTask.parse(packet, room) }
				return data;
			case RPCPacketFlag.SyncSettings:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SyncSettings.parse(packet, room) }
				return data;
			case RPCPacketFlag.SetInfected:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SetInfected.parse(packet, room) }
				return data;
			// case RPCPacketFlag.Exiled:
				// throw new Error("Exiled packets aren't used.")
				// return data;
			case RPCPacketFlag.CheckName:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.CheckName.parse(packet, room) }
				return data;
			case RPCPacketFlag.SetName:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SetName.parse(packet, room) }
				return data;
			case RPCPacketFlag.CheckColor:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.CheckColor.parse(packet, room) }
				return data;
			case RPCPacketFlag.SetColor:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SetColor.parse(packet, room) }
				return data;
			case RPCPacketFlag.SetHat:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SetHat.parse(packet, room) }
				return data;
			case RPCPacketFlag.SetSkin:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SetSkin.parse(packet, room) }
				return data;
			case RPCPacketFlag.ReportDeadBody:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.ReportDeadBody.parse(packet, room) }
				return data;
			case RPCPacketFlag.MurderPlayer:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.MurderPlayer.parse(packet, room) }
				return data;
			case RPCPacketFlag.SendChat:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SendChat.parse(packet, room) }
				return data;
			case RPCPacketFlag.CallEmergencyMeeting:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.CallEmergencyMeeting.parse(packet, room) }
				return data;
			case RPCPacketFlag.SetScanner:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SetScanner.parse(packet, room) }
				return data;
			case RPCPacketFlag.SendChatNote:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SendChatNote.parse(packet, room) }
				return data;
			case RPCPacketFlag.SetPet:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SetPet.parse(packet, room) }
				return data;
			case RPCPacketFlag.SetStartCounter:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SetStartCounter.parse(packet, room) }
				return data;
			case RPCPacketFlag.EnterVent:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.EnterVent.parse(packet, room) }
				return data;
			case RPCPacketFlag.ExitVent:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.ExitVent.parse(packet, room) }
				return data;
			case RPCPacketFlag.SnapTo:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SnapTo.parse(packet, room) }
				return data;
			case RPCPacketFlag.VotingClosed:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.VotingClosed.parse(packet, room) }
				return data;
			case RPCPacketFlag.VotingComplete:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.VotingComplete.parse(packet, room) }
				return data;
			case RPCPacketFlag.CastVote:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.CastVote.parse(packet, room) }
				return data;
			case RPCPacketFlag.ClearVote:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.ClearVote.parse(packet, room) }
				return data;
			case RPCPacketFlag.CastVoteKick:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.CastVoteKick.parse(packet, room) }
				return data;
			case RPCPacketFlag.CloseDoorsOfType:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.CloseDoorsOfType.parse(packet, room) }
				return data;
			case RPCPacketFlag.RepairSabotage:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.RepairSabotage.parse(packet, room) }
				return data;
			case RPCPacketFlag.SetTasks:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.SetTasks.parse(packet, room) }
				return data;
			case RPCPacketFlag.UpdateGameData:
				data.Packet = { RPCFlag: data.RPCFlag, ...rpcPacketHandlers.UpdateGameData.parse(packet, room) }
				return data;
		}
	},

	serialize(packet: RPCPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.NetID);
		buf.writeU8(packet.RPCFlag);
		switch(packet.RPCFlag) {
			case RPCPacketFlag.PlayAnimation:
				buf.writeBytes(rpcPacketHandlers.PlayAnimation.serialize(packet.Packet))
				break;
			case RPCPacketFlag.CompleteTask:
				buf.writeBytes(rpcPacketHandlers.CompleteTask.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SyncSettings:
				buf.writeBytes(rpcPacketHandlers.SyncSettings.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SetInfected:
				buf.writeBytes(rpcPacketHandlers.SetInfected.serialize(packet.Packet))
				break;
			// case RPCPacketFlag.Exiled:
			// 	throw new Error("Exiled packets aren't used.")
			// 	break;
			case RPCPacketFlag.CheckName:
				buf.writeBytes(rpcPacketHandlers.CheckName.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SetName:
				buf.writeBytes(rpcPacketHandlers.SetName.serialize(packet.Packet))
				break;
			case RPCPacketFlag.CheckColor:
				buf.writeBytes(rpcPacketHandlers.CheckColor.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SetColor:
				buf.writeBytes(rpcPacketHandlers.SetColor.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SetHat:
				buf.writeBytes(rpcPacketHandlers.SetHat.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SetSkin:
				buf.writeBytes(rpcPacketHandlers.SetSkin.serialize(packet.Packet))
				break;
			case RPCPacketFlag.ReportDeadBody:
				buf.writeBytes(rpcPacketHandlers.ReportDeadBody.serialize(packet.Packet))
				break;
			case RPCPacketFlag.MurderPlayer:
				buf.writeBytes(rpcPacketHandlers.MurderPlayer.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SendChat:
				buf.writeBytes(rpcPacketHandlers.SendChat.serialize(packet.Packet))
				break;
			case RPCPacketFlag.CallEmergencyMeeting:
				buf.writeBytes(rpcPacketHandlers.CallEmergencyMeeting.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SetScanner:
				buf.writeBytes(rpcPacketHandlers.SetScanner.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SendChatNote:
				buf.writeBytes(rpcPacketHandlers.SendChatNote.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SetPet:
				buf.writeBytes(rpcPacketHandlers.SetPet.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SetStartCounter:
				buf.writeBytes(rpcPacketHandlers.SetStartCounter.serialize(packet.Packet))
				break;
			case RPCPacketFlag.EnterVent:
				buf.writeBytes(rpcPacketHandlers.EnterVent.serialize(packet.Packet))
				break;
			case RPCPacketFlag.ExitVent:
				buf.writeBytes(rpcPacketHandlers.ExitVent.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SnapTo:
				buf.writeBytes(rpcPacketHandlers.SnapTo.serialize(packet.Packet))
				break;
			case RPCPacketFlag.VotingClosed:
				buf.writeBytes(rpcPacketHandlers.VotingClosed.serialize(packet.Packet))
				break;
			case RPCPacketFlag.VotingComplete:
				buf.writeBytes(rpcPacketHandlers.VotingComplete.serialize(packet.Packet))
				break;
			case RPCPacketFlag.CastVote:
				buf.writeBytes(rpcPacketHandlers.CastVote.serialize(packet.Packet))
				break;
			case RPCPacketFlag.ClearVote:
				buf.writeBytes(rpcPacketHandlers.ClearVote.serialize(packet.Packet))
				break;
			case RPCPacketFlag.CastVoteKick:
				buf.writeBytes(rpcPacketHandlers.CastVoteKick.serialize(packet.Packet))
				break;
			case RPCPacketFlag.CloseDoorsOfType:
				buf.writeBytes(rpcPacketHandlers.CloseDoorsOfType.serialize(packet.Packet))
				break;
			case RPCPacketFlag.RepairSabotage:
				buf.writeBytes(rpcPacketHandlers.ReportDeadBody.serialize(packet.Packet))
				break;
			case RPCPacketFlag.SetTasks:
				buf.writeBytes(rpcPacketHandlers.SetTasks.serialize(packet.Packet))
				break;
			case RPCPacketFlag.UpdateGameData:
				buf.writeBytes(rpcPacketHandlers.UpdateGameData.serialize(packet.Packet))
				break;
		}
		return buf;
	}
}
