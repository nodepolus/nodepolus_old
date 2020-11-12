import GameCreate, { GameCreatePacket } from './Subpackets/GameCreate'
import SetGameCode, { SetGameCodePacket } from './Subpackets/SetGameCode'
import JoinGame, { JoinGamePacket } from './Subpackets/JoinGame'
import JoinGameError, { JoinGameErrorPacket } from './Subpackets/JoinGameError'
import PlayerJoinedGame, { PlayerJoinedGamePacket } from './Subpackets/PlayerJoinedGame'
import StartGame, { StartGamePacket } from './Subpackets/StartGame'
import RemovePlayer, { RemovePlayerPacket } from './Subpackets/RemovePlayer'
import GameData, { GameDataPacket } from './Subpackets/GameData'
import JoinedGame, { JoinedGamePacket } from './Subpackets/JoinedGame'
import { EndGamePacket, EndGame } from './Subpackets/EndGame'
import AlterGame, { AlterGamePacket } from './Subpackets/AlterGame'
import MasterServers, { MasterServersPacket } from './Subpackets/MasterServers'
import Redirect, { RedirectPacket } from './Subpackets/Redirect'
import GameSearchResults, { GameSearchResultsPacket } from './Subpackets/GameSearchResults'
import { Room } from '../util/Room'
import PolusBuffer from '../util/PolusBuffer'
import { GameSearchPacket, GameSearch } from './Subpackets/GameSearch'
import KickPlayer, { KickPlayerPacket } from './Subpackets/KickPlayer'
import WaitingForHost, { WaitingForHostPacket } from './Subpackets/WaitingForHost'
import RemoveRoom, { RemoveRoomPacket } from './Subpackets/RemoveRoom'

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
						WaitingForHostPacket |
						RemoveRoomPacket

export interface UnreliablePacket {
	Packets: Packet[]
}

export default class Unreliable {
	GameCreatePacketHandler = new GameCreate();
	SetGameCodePacketHandler = new SetGameCode();
	JoinGamePacketHandler = new JoinGame();
	JoinGameErrorPacketHandler = new JoinGameError();
	PlayerJoinedGamePacketHandler = new PlayerJoinedGame();
	StartGamePacketHandler = new StartGame();
	RemovePlayerPacketHandler = new RemovePlayer();
	LateRejectionPacketHandler = this.RemovePlayerPacketHandler // fucking forte
	GameDataPacketHandler = new GameData()
	JoinedGamePacketHandler = new JoinedGame();
	EndGamePacketHandler = new EndGame();
	AlterGamePacketHandler = new AlterGame();
	MasterServersPacketHandler = new MasterServers();
	RedirectPacketHandler = new Redirect();
	GameSearchPacketHandler = new GameSearch();
	GameSearchResultsPacketHandler = new GameSearchResults();
	KickPlayerPacketHandler = new KickPlayer();
	WaitingForHostPacketHandler = new WaitingForHost();
	RemoveRoomPacketHandler = new RemoveRoom();
	parse(packet: PolusBuffer, room: Room, toServer: boolean): UnreliablePacket {
		const packets = [];
		while (packet.dataRemaining().length != 0) {
			const length = packet.readU16();
			const type = packet.readU8();
			const data = packet.readBytes(length);
			switch (type) {
				case 0x00:
					if (toServer) {
						packets.push(this.GameCreatePacketHandler.parse(data, room))
					} else {
						packets.push(this.SetGameCodePacketHandler.parse(data))
					}
					break;
				case 0x01:
					if (toServer) {
						packets.push(this.JoinGamePacketHandler.parse(data))
					} else {
						if (data.length <= 4) {
							packets.push(this.JoinGameErrorPacketHandler.parse(data, room))
						} else {
							packets.push(this.PlayerJoinedGamePacketHandler.parse(data))
						}
					}
					break;
				case 0x02:
					packets.push(this.StartGamePacketHandler.parse(data))
					break;
				case 0x03:
					packets.push(this.RemoveRoomPacketHandler.parse(data))
				case 0x04:
					packets.push(this.RemovePlayerPacketHandler.parse(data, room));
					break;
				case 0x05:
				case 0x06:
					packets.push(this.GameDataPacketHandler.parse(data, type == 0x06, room));
					break;
				case 0x07:
					packets.push(this.JoinedGamePacketHandler.parse(data));
					break;
				case 0x08:
					packets.push(this.EndGamePacketHandler.parse(data));
					break;
				case 0x0a:
					packets.push(this.AlterGamePacketHandler.parse(data));
					break;
				case 0x0b:
					packets.push(this.KickPlayerPacketHandler.parse(data))
					break;
				case 0x0c:
					packets.push(this.WaitingForHostPacketHandler.parse(data))
					break;
				case 0x0e:
					packets.push(this.MasterServersPacketHandler.parse(data));
					break;
				case 0x0d:
					packets.push(this.RedirectPacketHandler.parse(data));
					break;
				case 0x10:
					if (toServer) {
						packets.push(this.GameSearchPacketHandler.parse(data, room));
					} else {
						packets.push(this.GameSearchResultsPacketHandler.parse(data));
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
		// console.log(packet)
		packet.Packets.forEach(subpacket => {
			// @ts-ignore
			let serialized:PolusBuffer = this[subpacket.type + "PacketHandler"].serialize(subpacket)
			let type: number | null = null;
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
				case 'RemoveRoom':
					type = 0x03;
					break;
				case 'RemovePlayer':
					type = 0x04;
					break;
				case 'GameData':
					type = (subpacket.RecipientClientID || subpacket.RecipientClientID===0n) ? 0x06 : 0x05;
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
				case "KickPlayer":
					type = 0x0b;
					break;
				case "WaitingForHost":
					type = 0x0c;
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
      
      if (type === null) {
        throw new Error(`Unknown UnreliablePacket type: ${type}`)
      }

			buf.writeU16(serialized.length);
			buf.writeU8(type);
			buf.writeBytes(serialized);
		})
		return buf;
	}
}
