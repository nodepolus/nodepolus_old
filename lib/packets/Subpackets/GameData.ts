import RoomCode from "../PacketElements/RoomCode.js";
import PolusBuffer from "../../util/PolusBuffer.js";
import Room from "../../util/Room.js";

import Data, { DataPacket } from "./GameDataPackets/Data.js";
import RPC, { RPCPacket } from "./GameDataPackets/RPC.js";
import Spawn from "./GameDataPackets/Spawn.js";
import Ready, { ReadyPacket } from "./GameDataPackets/Ready.js";
import SceneChange, { SceneChangePacket } from "./GameDataPackets/SceneChange.js";
import Despawn, { DespawnPacket } from "./GameDataPackets/Despawn.js";
import { IGameObject } from "../../util/GameObject.js";

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
	constructor(private room: Room, private toServer: boolean){}
	DataPacketHandler = new Data(this.room);
	RPCPacketHandler = new RPC(this.room);
	SpawnPacketHandler = new Spawn(this.room);
	DespawnPacketHandler = new Despawn();
	SceneChangePacketHandler = new SceneChange();
	ReadyPacketHandler = new Ready();

	parse(packet: PolusBuffer, isGameDataTo: Boolean): GameDataPacket {
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
					// @ts-ignore
					data.Packets.push({ type: GameDataPacketType.Data, ...this.DataPacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.RPC:
					// @ts-ignore
					data.Packets.push({ type: GameDataPacketType.RPC, ...this.RPCPacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.Spawn:
					// @ts-ignore
					data.Packets.push({ type: GameDataPacketType.Spawn, ...this.SpawnPacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.Despawn:
					// @ts-ignore
					data.Packets.push({ type: GameDataPacketType.Despawn, ...this.DespawnPacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.SceneChange:
					// @ts-ignore
					data.Packets.push({ type: GameDataPacketType.SceneChange, ...this.SceneChangePacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.Ready:
					// @ts-ignore
					data.Packets.push({ type: GameDataPacketType.Ready, ...this.ReadyPacketHandler.parse(rawdata) })
					break;
			}

		}
		return data;
	}

	serialize(packet: GameDataPacket): PolusBuffer {
		var pb = new PolusBuffer();
		pb.write32(RoomCode.stringToInt(packet.RoomCode))
		if (packet.RecipientClientID || packet.RecipientClientID === 0n) {
			pb.writeVarInt(packet.RecipientClientID)
		}
		pb.writeBytes(PolusBuffer.concat(...packet.Packets.map(subpacket => {
			let dataPB;
			// @ts-ignore
			switch(subpacket.type) {
				case GameDataPacketType.Data:
					// @ts-ignore
					dataPB = this.DataPacketHandler.serialize(subpacket)
					break;
				case GameDataPacketType.RPC:
					// @ts-ignore
					dataPB = this.RPCPacketHandler.serialize(subpacket)
					break;
				case GameDataPacketType.Spawn:
					// @ts-ignore
					dataPB = this.SpawnPacketHandler.serialize(subpacket)
					break;
				case GameDataPacketType.Despawn:
					// @ts-ignore
					dataPB = this.DespawnPacketHandler.serialize(subpacket)
					break;
				case GameDataPacketType.SceneChange:
					// @ts-ignore
					dataPB = this.SceneChangePacketHandler.serialize(subpacket)
					break;
				case GameDataPacketType.Ready:
					// @ts-ignore
					dataPB = this.ReadyPacketHandler.serialize(subpacket)
					break;
				default:
					console.error("AA?A??A?A?A??A??A?AAAAA GAME DATA SERIALIZATION FAILED. UNK PACKET TYPE", packet)
					process.exit()
			}
			let dataPBlenPB = new PolusBuffer(3)
			dataPBlenPB.writeU16(dataPB.length)
			// @ts-ignore
			dataPBlenPB.writeU8(subpacket.type)
			return PolusBuffer.concat(dataPBlenPB, dataPB)
		})))
		return pb;
	}
};
