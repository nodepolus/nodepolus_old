import RoomCode from "../PacketElements/RoomCode";
import PolusBuffer from "../../util/PolusBuffer";
import Room from "../../util/Room";

import Data from "./GameDataPackets/Data";
import RPC from "./GameDataPackets/RPC";
import Spawn from "./GameDataPackets/Spawn";

export interface GameDataPacket {
	RoomCode: string,
	RecipientNetID?: BigInt,
	Packets: any[]
}

export enum GameDataPacketType {
	Data = 0x01,
	RPC = 0x02,
	Spawn = 0x04,
	Despawn = 0x05,
	SceneChange = 0x06,
	Ready = 0x07,
	JoinedGame = 0x09
}

export default class GameData {
	constructor(private room: Room, private toServer: boolean){}
	DataPacketHandler = new Data();
	RPCPacketHandler = new RPC();
	SpawnPacketHandler = new Spawn(this.room);
	DespawnPacketHandler = new Despawn();
	SceneChangePacketHandler = new SceneChange();
	ReadyPacketHandler = new Ready();
	JoinedGamePacketHandler = new JoinedGame();

	parse(packet: PolusBuffer, isGameDataTo: Boolean): GameDataPacket {
		let data: GameDataPacket;
		data.RoomCode = RoomCode.intToString(packet.read32());
		if (isGameDataTo) {
			data.RecipientNetID = packet.readVarInt();
		}
		while(packet.dataRemaining().length != 0) {
			const length = packet.readU16();
			const type = packet.readU8();
			const rawdata = packet.readBytes(length);
			switch(type) {
				case GameDataPacketType.Data:
					data.Packets.push({ type: GameDataPacketType.Data, ...this.DataPacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.RPC:
					data.Packets.push({ type: GameDataPacketType.RPC, ...this.RPCPacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.Spawn:
					data.Packets.push({ type: GameDataPacketType.Spawn, ...this.SpawnPacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.Despawn:
					data.Packets.push({ type: GameDataPacketType.Despawn, ...this.DespawnPacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.SceneChange:
					data.Packets.push({ type: GameDataPacketType.SceneChange, ...this.SceneChangePacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.Ready:
					data.Packets.push({ type: GameDataPacketType.Ready, ...this.ReadyPacketHandler.parse(rawdata) })
					break;
				case GameDataPacketType.JoinedGame:
					data.Packets.push({type: GameDataPacketType.JoinedGame, ...this.JoinedGamePacketHandler.parse(rawdata)})
					break;
			}
			
		}
		return data;
	}

	serialize(packet: GameDataPacket): PolusBuffer {
		return new PolusBuffer();
	}
};