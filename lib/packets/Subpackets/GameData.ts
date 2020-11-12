import RoomCode from '../PacketElements/RoomCode'
import PolusBuffer from '../../util/PolusBuffer'
import { Room } from '../../util/Room'

import Data, { DataPacket } from './GameDataPackets/Data'
import RPC, { RPCPacket } from './GameDataPackets/RPC'
import Spawn from './GameDataPackets/Spawn'
import Ready, { ReadyPacket } from './GameDataPackets/Ready'
import SceneChange, { SceneChangePacket } from './GameDataPackets/SceneChange'
import Despawn, { DespawnPacket } from './GameDataPackets/Despawn'
import { IGameObject } from '../../util/GameObject'

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

export default class GameData {
	DataPacketHandler = new Data();
	RPCPacketHandler = new RPC();
	SpawnPacketHandler = new Spawn();
	DespawnPacketHandler = new Despawn();
	SceneChangePacketHandler = new SceneChange();
	ReadyPacketHandler = new Ready();

	parse(packet: PolusBuffer, isGameDataTo: Boolean, room: Room): GameDataPacket {
		let data: GameDataPacket = {
      		type: 'GameData',
			RoomCode: RoomCode.intToString(packet.read32()),
			Packets: new Array()
		};
		if (isGameDataTo) {
			data.RecipientClientID = packet.readVarInt();
		}
		while(packet.dataRemaining().length != 0) {
            const length = packet.readU16();
			const type = packet.readU8();
            const rawdata = packet.readBytes(length);
			switch(type) {
				case GameDataPacketType.Data:
					data.Packets.push(this.DataPacketHandler.parse(rawdata, room))
					break;
				case GameDataPacketType.RPC:
					data.Packets.push(this.RPCPacketHandler.parse(rawdata, room))
					break;
				case GameDataPacketType.Spawn:
					data.Packets.push(this.SpawnPacketHandler.parse(rawdata, room))
					break;
				case GameDataPacketType.Despawn:
					data.Packets.push(this.DespawnPacketHandler.parse(rawdata))
					break;
				case GameDataPacketType.SceneChange:
					data.Packets.push(this.SceneChangePacketHandler.parse(rawdata))
					break;
				case GameDataPacketType.Ready:
					data.Packets.push(this.ReadyPacketHandler.parse(rawdata))
					break;
			}

		}
		return data;
	}

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
					dataPB = this.DataPacketHandler.serialize(subpacket, room)
					break;
				case GameDataPacketType.RPC:
					dataPB = this.RPCPacketHandler.serialize(subpacket, room)
					break;
				case GameDataPacketType.Spawn:
					dataPB = this.SpawnPacketHandler.serialize(subpacket, room)
					break;
				case GameDataPacketType.Despawn:
					dataPB = this.DespawnPacketHandler.serialize(subpacket)
					break;
				case GameDataPacketType.SceneChange:
					dataPB = this.SceneChangePacketHandler.serialize(subpacket)
					break;
				case GameDataPacketType.Ready:
					dataPB = this.ReadyPacketHandler.serialize(subpacket)
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
};
