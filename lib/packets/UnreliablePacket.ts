import GameCreate, { GameCreatePacket } from "./Subpackets/GameCreate";
import SetGameCode, { SetGameCodePacket } from "./Subpackets/SetGameCode";
import JoinGame, { JoinGamePacket } from "./Subpackets/JoinGame";
import JoinGameError, { JoinGameErrorPacket } from "./Subpackets/JoinGameError";
import PlayerJoinedGame, { PlayerJoinedGamePacket } from "./Subpackets/PlayerJoinedGame";
import StartGame, { StartGamePacket } from "./Subpackets/StartGame";
import RemovePlayer, { RemovePlayerPacket } from "./Subpackets/RemovePlayer.js";
import GameData, { GameDataPacket } from "./Subpackets/GameData";
import JoinedGame, { JoinedGamePacket } from "./Subpackets/JoinedGame";
import { EndGamePacket, EndGame } from "./Subpackets/EndGame";
import AlterGame, { AlterGamePacket } from "./Subpackets/AlterGame";
import MasterServers, { MasterServersPacket } from "./Subpackets/MasterServers";
import Redirect, { RedirectPacket } from "./Subpackets/Redirect";
import GameSearchResults, { GameSearchResultsPacket } from "./Subpackets/GameSearchResults";
import Room from "../util/Room";
import PolusBuffer from "../util/PolusBuffer";
import { GameSearchPacket, GameSearch } from "./Subpackets/GameSearch";
import KickPlayer, { KickPlayerPacket } from "./Subpackets/KickPlayer";
import WaitingForHost, { WaitingForHostPacket } from "./Subpackets/WaitingForHost";

export type Packet = GameCreatePacket | 
						SetGameCodePacket | 
						JoinGamePacket |
						JoinGameErrorPacket |
						PlayerJoinedGamePacket |
						StartGamePacket |
						RemovePlayerPacket |
						GameDataPacket |
						JoinedGamePacket |
						EndGamePacket |
						AlterGamePacket |
						MasterServersPacket |
						RedirectPacket |
						GameSearchPacket |
						GameSearchResultsPacket |
						KickPlayerPacket |
						WaitingForHostPacket

export interface UnreliablePacket {
	Packets: Packet[]
}

export default class Unreliable {
	constructor(private room: Room, private toServer: boolean) {}
	GameCreatePacketHandler = new GameCreate();
	SetGameCodePacketHandler = new SetGameCode();
	JoinGamePacketHandler = new JoinGame();
	JoinGameErrorPacketHandler = new JoinGameError(this.room);
	PlayerJoinedGamePacketHandler = new PlayerJoinedGame();
	StartGamePacketHandler = new StartGame();
	RemovePlayerPacketHandler = new RemovePlayer(this.room);
	GameDataPacketHandler = new GameData(this.room, this.toServer);
	JoinedGamePacketHandler = new JoinedGame();
	EndGamePacketHandler = new EndGame(this.room);
	AlterGamePacketHandler = new AlterGame();
	MasterServersPacketHandler = new MasterServers();
	RedirectPacketHandler = new Redirect();
	GameSearchPacketHandler = new GameSearch();
	GameSearchResultsPacketHandler = new GameSearchResults();
	KickPlayerPacketHandler = new KickPlayer();
	WaitingForHostPacketHandler = new WaitingForHost();
	parse(packet: PolusBuffer): UnreliablePacket {
		const packets = [];
		while (packet.dataRemaining().length != 0) {
			const length = packet.readU16();
			const type = packet.readU8();
			const data = packet.readBytes(length);
			switch (type) {
				case 0x00:
					if (this.toServer) {
						packets.push({ type: "GameCreate", ...this.GameCreatePacketHandler.parse(data) });
					} else {
						packets.push({ type: "SetGameCode", ...this.SetGameCodePacketHandler.parse(data) });
					}
					break;
				case 0x01:
					if (this.toServer) {
						packets.push({ type: "JoinGame", ...this.JoinGamePacketHandler.parse(data) });
					} else {
						if (data.length == 1) {
							packets.push({ type: "JoinGameError", ...this.JoinGameErrorPacketHandler.parse(data) });
						} else {
							packets.push({ type: "PlayerJoinedGame", ...this.PlayerJoinedGamePacketHandler.parse(data) });
						}
					}
					break;
				case 0x02:
					packets.push({ type: "StartGame", ...this.StartGamePacketHandler.parse(data) });
					break;
				case 0x04:
					packets.push({ type: "RemovePlayer", ...this.RemovePlayerPacketHandler.parse(data) });
					break;
				case 0x05:
				case 0x06:
					packets.push({ type: "GameData", ...this.GameDataPacketHandler.parse(data, type == 0x06) });
					break;
				case 0x07:
					packets.push({ type: "JoinedGame", ...this.JoinedGamePacketHandler.parse(data) });
					break;
				case 0x08:
					packets.push({ type: "EndGame", ...this.EndGamePacketHandler.parse(data) });
					break;
				case 0x0a:
					packets.push({ type: "AlterGame", ...this.AlterGamePacketHandler.parse(data) });
					break;
				case 0x0b:
					packets.push({ type: "KickPlayer", ...this.KickPlayerPacketHandler.parse(data)})
					break;
				case 0x0c:
					packets.push({ type: "WaitingForHost", ...this.WaitingForHostPacketHandler.parse(data)})
					break;
				case 0x0e:
					packets.push({ type: "MasterServers", ...this.MasterServersPacketHandler.parse(data) });
					break;
				case 0x0d:
					packets.push({ type: "Redirect", ...this.RedirectPacketHandler.parse(data) });
					break;
				case 0x10:
					if (this.toServer) {
						packets.push({ type: "GameSearch", ...this.GameSearchPacketHandler.parse(data) });
					} else {
						packets.push({ type: "GameSearchResults", ...this.GameSearchResultsPacketHandler.parse(data) });
					}
					break;
				default:
					break;
			}
		}
		return { Packets: packets };
	}
	serialize(packet: UnreliablePacket):PolusBuffer {
		var buf = new PolusBuffer();
		packet.Packets.forEach(subpacket => {
			// @ts-ignore
			let serialized:PolusBuffer = this[subpacket.type + "PacketHandler"].serialize(subpacket)
			let type: number;
			// @ts-ignore
			switch(subpacket.type) {
				case 'GameCreate':
				case 'SetGameCode':
					type = 0x00;
					break;
				case 'JoinGame':
				case 'JoinGameError':
				case 'PlayerJoinedGame':
					type = 0x01;
					break;
				case 'StartGame':
					type = 0x02;
					break;
				case 'RemovePlayer':
					type = 0x04;
					break;
				case 'GameData':
					type = (<GameDataPacket>subpacket).RecipientNetID?0x06:0x05;
					break;
				case 'JoinedGame':
					type = 0x07;
					break;
				case 'EndGame':
					type = 0x08;
					break;
				case 'AlterGame':
					type = 0x0a;
					break;
				case 'MasterServers':
					type = 0x0e;
					break;
				case 'Redirect':
					type = 0x0d;
					break;
				case 'GameSearch':
				case 'GameSearchResults':
					type = 0x10;
					break;
			}
			buf.writeU16(serialized.length);
			buf.writeU16(type);
			buf.writeBytes(serialized);
		})
		return buf;
	}
}