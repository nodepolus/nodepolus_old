import RoomCode from '../PacketElements/RoomCode'
import PolusBuffer from '../../util/PolusBuffer'
import { Room } from '../../util/Room'

import { Data, DataPacket } from './GameDataPackets/Data'
import { RPC, RPCPacket } from './GameDataPackets/RPC'
import { Spawn } from './GameDataPackets/Spawn'
import { Ready, ReadyPacket } from './GameDataPackets/Ready'
import { SceneChange, SceneChangePacket } from './GameDataPackets/SceneChange'
import { Despawn, DespawnPacket } from './GameDataPackets/Despawn'
import { IGameObject } from '../../util/GameObject'
import { PacketHandler, PacketHandlerOpts } from '../Packet'

export interface GameDataPacket {
  type: 'GameData',
	RoomCode: string,
	RecipientClientID?: bigint,
	Packets: (DataPacket|RPCPacket|IGameObject|ReadyPacket|SceneChangePacket|DespawnPacket)[]
}

export enum GameDataPacketType {
	Data = 0x01,
	RPC = 0x02,
	Spawn = 0x04,
	Despawn = 0x05,
	SceneChange = 0x06,
	Ready = 0x07
}

export const GameData: PacketHandler<GameDataPacket> = {
  parse(packet: PolusBuffer, room: Room, opts: PacketHandlerOpts): GameDataPacket {
		let data: GameDataPacket = {
      		type: 'GameData',
			RoomCode: RoomCode.intToString(packet.read32()),
			Packets: new Array()
		};
		if (opts?.isGameDataTo) {
			data.RecipientClientID = packet.readVarInt();
		}
		while(packet.dataRemaining().length != 0) {
            const length = packet.readU16();
			const type = packet.readU8();
            const rawdata = packet.readBytes(length);
			switch(type) {
				case GameDataPacketType.Data:
					data.Packets.push(Data.parse(rawdata, room))
					break;
				case GameDataPacketType.RPC:
					data.Packets.push(RPC.parse(rawdata, room))
					break;
				case GameDataPacketType.Spawn:
					data.Packets.push(Spawn.parse(rawdata, room))
					break;
				case GameDataPacketType.Despawn:
					data.Packets.push(Despawn.parse(rawdata, room))
					break;
				case GameDataPacketType.SceneChange:
					data.Packets.push(SceneChange.parse(rawdata, room))
					break;
				case GameDataPacketType.Ready:
					data.Packets.push(Ready.parse(rawdata, room))
					break;
			}

		}
		return data;
	},

	serialize(packet: GameDataPacket, room: Room): PolusBuffer {
		var pb = new PolusBuffer();
		pb.write32(RoomCode.stringToInt(packet.RoomCode))
		if (packet.RecipientClientID || packet.RecipientClientID === 0n) {
			pb.writeVarInt(packet.RecipientClientID)
		}
		pb.writeBytes(PolusBuffer.concat(...packet.Packets.map(subpacket => {
			let dataPB;
			switch(subpacket.type) {
				case GameDataPacketType.Data:
					dataPB = Data.serialize(subpacket, room)
					break;
				case GameDataPacketType.RPC:
					dataPB = RPC.serialize(subpacket, room)
					break;
				case GameDataPacketType.Spawn:
					dataPB = Spawn.serialize(subpacket, room)
					break;
				case GameDataPacketType.Despawn:
					dataPB = Despawn.serialize(subpacket, room)
					break;
				case GameDataPacketType.SceneChange:
					dataPB = SceneChange.serialize(subpacket, room)
					break;
				case GameDataPacketType.Ready:
					dataPB = Ready.serialize(subpacket, room)
					break;
				default:
					console.error("AA?A??A?A?A??A??A?AAAAA GAME DATA SERIALIZATION FAILED. UNK PACKET TYPE", packet)
					process.exit()
			}
			let dataPBlenPB = new PolusBuffer(3)
			dataPBlenPB.writeU16(dataPB.length)
			dataPBlenPB.writeU8(subpacket.type)
			return PolusBuffer.concat(dataPBlenPB, dataPB)
		})))
		return pb;
	}
}