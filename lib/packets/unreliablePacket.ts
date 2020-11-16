import { Room } from "../util/room";
import PolusBuffer from "../util/polusBuffer";
import { PacketHandler, PacketHandlerOpts } from "./packet";

import { GameCreate, GameCreatePacket } from "./subpackets/gameCreate";
import { SetGameCode, SetGameCodePacket } from "./subpackets/setGameCode";
import { JoinGame, JoinGamePacket } from "./subpackets/joinGame";
import { JoinGameError, JoinGameErrorPacket } from "./subpackets/joinGameError";
import {
  PlayerJoinedGame,
  PlayerJoinedGamePacket,
} from "./subpackets/playerJoinedGame";
import { StartGame, StartGamePacket } from "./subpackets/startGame";
import { RemovePlayer, RemovePlayerPacket } from "./subpackets/removePlayer";
import { GameData, GameDataPacket } from "./subpackets/gameData";
import { JoinedGame, JoinedGamePacket } from "./subpackets/joinedGame";
import { EndGamePacket, EndGame } from "./subpackets/endGame";
import { AlterGame, AlterGamePacket } from "./subpackets/alterGame";
import { MasterServers, MasterServersPacket } from "./subpackets/masterServers";
import { Redirect, RedirectPacket } from "./subpackets/redirect";
import {
  GameSearchResults,
  GameSearchResultsPacket,
} from "./subpackets/gameSearchResults";
import { GameSearchPacket, GameSearch } from "./subpackets/gameSearch";
import { KickPlayer, KickPlayerPacket } from "./subpackets/kickPlayer";
import {
  WaitingForHost,
  WaitingForHostPacket,
} from "./subpackets/waitingForHost";
import { RemoveRoom, RemoveRoomPacket } from "./subpackets/removeRoom";

export type Packet =
  | GameCreatePacket
  | SetGameCodePacket
  | JoinGamePacket
  | JoinGameErrorPacket
  | PlayerJoinedGamePacket
  | StartGamePacket
  | RemovePlayerPacket
  | GameDataPacket
  | JoinedGamePacket
  | EndGamePacket
  | AlterGamePacket
  | MasterServersPacket
  | RedirectPacket
  | GameSearchPacket
  | GameSearchResultsPacket
  | KickPlayerPacket
  | WaitingForHostPacket
  | RemoveRoomPacket;

export enum UnreliablePacketType {
  GameCreate = "GameCreate",
  SetGameCode = "SetGameCode",
  JoinGame = "JoinGame",
  JoinGameError = "JoinGameError",
  PlayerJoinedGame = "PlayerJoinedGame",
  StartGame = "StartGame",
  RemovePlayer = "RemovePlayer",
  GameData = "GameData",
  JoinedGame = "JoinedGame",
  EndGame = "EndGame",
  AlterGame = "AlterGame",
  MasterServers = "MasterServers",
  Redirect = "Redirect",
  GameSearch = "GameSearch",
  GameSearchResults = "GameSearchResults",
  KickPlayer = "KickPlayer",
  WaitingForHost = "WaitingForHost",
  RemoveRoom = "RemoveRoom",
  LateRejection = "LateRejection",
}

export interface UnreliablePacket {
  Packets: Packet[];
}

export const unreliablePackerHandlers: {
  [type in keyof typeof UnreliablePacketType]: PacketHandler<Packet>;
} = {
  [UnreliablePacketType.GameCreate]: GameCreate,
  [UnreliablePacketType.SetGameCode]: SetGameCode,
  [UnreliablePacketType.JoinGame]: JoinGame,
  [UnreliablePacketType.JoinGameError]: JoinGameError,
  [UnreliablePacketType.PlayerJoinedGame]: PlayerJoinedGame,
  [UnreliablePacketType.StartGame]: StartGame,
  [UnreliablePacketType.RemovePlayer]: RemovePlayer,
  [UnreliablePacketType.LateRejection]: RemovePlayer,
  [UnreliablePacketType.GameData]: GameData,
  [UnreliablePacketType.JoinedGame]: JoinedGame,
  [UnreliablePacketType.EndGame]: EndGame,
  [UnreliablePacketType.AlterGame]: AlterGame,
  [UnreliablePacketType.MasterServers]: MasterServers,
  [UnreliablePacketType.Redirect]: Redirect,
  [UnreliablePacketType.GameSearch]: GameSearch,
  [UnreliablePacketType.GameSearchResults]: GameSearchResults,
  [UnreliablePacketType.KickPlayer]: KickPlayer,
  [UnreliablePacketType.WaitingForHost]: WaitingForHost,
  [UnreliablePacketType.RemoveRoom]: RemoveRoom,
};

export const Unreliable: PacketHandler<UnreliablePacket> = {
  parse(
    packet: PolusBuffer,
    room: Room,
    opts: PacketHandlerOpts
  ): UnreliablePacket {
    const packets = [];
    while (packet.dataRemaining().length != 0) {
      const length = packet.readU16();
      const type = packet.readU8();
      const data = packet.readBytes(length);
      switch (type) {
        case 0x00:
          if (opts.toServer) {
            packets.push(GameCreate.parse(data, room));
          } else {
            packets.push(SetGameCode.parse(data, room));
          }
          break;
        case 0x01:
          if (opts.toServer) {
            packets.push(JoinGame.parse(data, room));
          } else {
            if (data.length <= 4) {
              packets.push(JoinGameError.parse(data, room));
            } else {
              packets.push(PlayerJoinedGame.parse(data, room));
            }
          }
          break;
        case 0x02:
          packets.push(StartGame.parse(data, room));
          break;
        case 0x03:
          packets.push(RemoveRoom.parse(data, room));
        case 0x04:
          packets.push(RemovePlayer.parse(data, room));
          break;
        case 0x05:
        case 0x06:
          packets.push(
            GameData.parse(data, room, {
              toServer: opts.toServer,
              isGameDataTo: type == 0x06,
            })
          );
          break;
        case 0x07:
          packets.push(JoinedGame.parse(data, room));
          break;
        case 0x08:
          packets.push(EndGame.parse(data, room));
          break;
        case 0x0a:
          packets.push(AlterGame.parse(data, room));
          break;
        case 0x0b:
          packets.push(KickPlayer.parse(data, room));
          break;
        case 0x0c:
          packets.push(WaitingForHost.parse(data, room));
          break;
        case 0x0e:
          packets.push(MasterServers.parse(data, room));
          break;
        case 0x0d:
          packets.push(Redirect.parse(data, room));
          break;
        case 0x10:
          if (opts.toServer) {
            packets.push(GameSearch.parse(data, room));
          } else {
            packets.push(GameSearchResults.parse(data, room));
          }
          break;
        default:
          break;
      }
    }
    return { Packets: packets };
  },

  serialize(packet: UnreliablePacket, room: Room): PolusBuffer {
    var buf = new PolusBuffer();
    // console.log(packet)
    packet.Packets.forEach((subpacket) => {
      const handler: PacketHandler<Packet> =
        unreliablePackerHandlers[subpacket.type];

      if (!handler) {
        throw new Error(
          "Missing handler for unrealiable packet:" + subpacket.type
        );
      }

      // TODO: fix this typing
      const serialized = handler.serialize(subpacket as any, room);

      let type: number | null = null;
      switch (subpacket.type) {
        case "GameCreate":
        case "SetGameCode":
          type = 0x00;
          break;
        case "JoinGame":
        case "JoinGameError":
        case "PlayerJoinedGame":
          type = 0x01;
          break;
        case "StartGame":
          type = 0x02;
          break;
        case "RemoveRoom":
          type = 0x03;
          break;
        case "RemovePlayer":
          type = 0x04;
          break;
        case "GameData":
          type =
            subpacket.RecipientClientID || subpacket.RecipientClientID === 0n
              ? 0x06
              : 0x05;
          break;
        case "JoinedGame":
          type = 0x07;
          break;
        case "EndGame":
          type = 0x08;
          break;
        case "AlterGame":
          type = 0x0a;
          break;
        case "KickPlayer":
          type = 0x0b;
          break;
        case "WaitingForHost":
          type = 0x0c;
          break;
        case "MasterServers":
          type = 0x0e;
          break;
        case "Redirect":
          type = 0x0d;
          break;
        case "GameSearch":
        case "GameSearchResults":
          type = 0x10;
          break;
      }

      if (type === null) {
        throw new Error(`Unknown UnreliablePacket type: ${type}`);
      }

      buf.writeU16(serialized.length);
      buf.writeU8(type);
      buf.writeBytes(serialized);
    });
    return buf;
  },
};
