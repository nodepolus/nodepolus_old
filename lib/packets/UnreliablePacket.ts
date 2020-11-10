import { SubPacket, packetHandlers } from './Subpackets/subpacket'

import Room from '../util/Room'
import PolusBuffer from '../util/PolusBuffer'

export interface UnreliablePacket {
	Packets: SubPacket[]
}

export default class Unreliable {
	constructor(private room: Room, private toServer: boolean) {}

	parse(packet: PolusBuffer, room: Room): UnreliablePacket {
		const packets = [];
		while (packet.dataRemaining().length != 0) {
			const length = packet.readU16();
			const type = packet.readU8();
      const data = packet.readBytes(length);

			switch (type) {
				case 0x00:
					if (this.toServer) {
						packets.push({ type: "GameCreate", ...packetHandlers.GameCreate.parse(data, room) })
					} else {
            packets.push({ type: "SetGameCode", ...packetHandlers.SetGameCode.parse(data, room) });
					}
					break;
				case 0x01:
					if (this.toServer) {
						packets.push({ type: "JoinGame", ...packetHandlers.JoinGame.parse(data, room) });
					} else {
						if (data.length <= 4) {
							packets.push({ type: "JoinGameError", ...packetHandlers.JoinGame.parse(data, room) });
						} else {
							packets.push({ type: "", ...packetHandlers.PlayerJoinedGame.parse(data, room) });
						}
					}
					break;
				case 0x02:
					packets.push({ type: "StartGame", ...packetHandlers.StartGame.parse(data, room) });
					break;
				case 0x04:
					packets.push({ type: "RemovePlayer", ...packetHandlers.RemovePlayer.parse(data, room) });
					break;
				case 0x05:
				case 0x06:
					packets.push({ type: "GameData", ...packetHandlers.GameData.parse(data, room, { isGameDataTo: type == 0x06 }) })
					break;
				case 0x07:
					packets.push({ type: "JoinedGame", ...packetHandlers.JoinedGame.parse(data, room) });
					break;
				case 0x08:
					packets.push({ type: "EndGame", ...packetHandlers.EndGame.parse(data, room) });
					break;
				case 0x0a:
					packets.push({ type: "AlterGame", ...packetHandlers.AlterGame.parse(data, room) });
					break;
				case 0x0b:
					packets.push({ type: "KickPlayer", ...packetHandlers.KickPlayer.parse(data, room)})
					break;
				case 0x0c:
					packets.push({ type: "WaitingForHost", ...packetHandlers.WaitingForHost.parse(data, room)})
					break;
				case 0x0e:
					packets.push({ type: "MasterServers", ...packetHandlers.MasterServers.parse(data, room) });
					break;
				case 0x0d:
					packets.push({ type: "Redirect", ...packetHandlers.Redirect.parse(data, room) });
					break;
				case 0x10:
					if (this.toServer) {
						packets.push({ type: "GameSearch", ...packetHandlers.GameSearch.parse(data, room) });
					} else {
						packets.push({ type: "GameSearchResults", ...packetHandlers.GameSearchResults.parse(data, room) });
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
		console.log(packet)
		packet.Packets.forEach(subpacket => {
      const serialized = packetHandlers[subpacket.type].serialize(subpacket)

      let type: number | null = null

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
        console.error(`Unknown UnreliablePacket type: ${type}`)
        process.exit(1)
      }

			buf.writeU16(serialized.length);
			buf.writeU8(type);
			buf.writeBytes(serialized);
		})
		return buf;
	}
}