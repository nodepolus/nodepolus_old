import PolusBuffer from '../../util/PolusBuffer'
import Room from '../../util/Room'

import { GameCreate, GameCreatePacket } from './GameCreate'
import { SetGameCode, SetGameCodePacket } from './SetGameCode'
import { JoinGame, JoinGamePacket } from './JoinGame'
import { JoinGameError, JoinGameErrorPacket } from './JoinGameError'
import { PlayerJoinedGame, PlayerJoinedGamePacket } from './PlayerJoinedGame'
import { StartGame, StartGamePacket } from './StartGame'
import { RemovePlayer, RemovePlayerPacket } from './RemovePlayer'
import GameData, { GameDataPacket } from './GameData'
import { JoinedGame, JoinedGamePacket } from './JoinedGame'
import { EndGame, EndGamePacket } from './EndGame'
import { AlterGame, AlterGamePacket } from './AlterGame'
import { MasterServers, MasterServersPacket } from './MasterServers'
import { Redirect, RedirectPacket } from './Redirect'
import { GameSearch, GameSearchPacket } from './GameSearch'
import { GameSearchResults, GameSearchResultsPacket } from './GameSearchResults'
import { KickPlayer, KickPlayerPacket } from './KickPlayer'
import { WaitingForHost, WaitingForHostPacket } from './WaitingForHost'

export enum SubPacketType {
  GameCreate = 'GameCreate',
  SetGameCode = 'SetGameCode',
  JoinGame = 'JoinGame',
  JoinGameError = 'JoinGameError',
  PlayerJoinedGame = 'PlayerJoinedGame',
  StartGame = 'StartGame',
  RemovePlayer = 'RemovePlayer',
  GameData = 'GameData',
  JoinedGame = 'JoinedGame',
  EndGame = 'EndGame',
  AlterGame = 'AlterGame',
  MasterServers = 'MasterServers',
  Redirect = 'Redirect',
  GameSearch = 'GameSearch',
  GameSearchResults = 'GameSearchResults',
  KickPlayer = 'KickPlayer',
  WaitingForHost = 'WaitingForHost'
}

export type SubPacket =
  GameCreatePacket | 
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

export interface ParseOpts {
  isGameDataTo?: boolean,
  toServer?: boolean
}

export interface SubpacketClass<T> {
  parse (packet: PolusBuffer, room: Room, opts?: ParseOpts): T,
  serialize (packet: T): PolusBuffer
}

export const packetHandlers: {
  [packetType in keyof typeof SubPacketType]: SubpacketClass<SubPacket>
} = {
  [SubPacketType.GameCreate]: GameCreate,
  [SubPacketType.SetGameCode]: SetGameCode,
  [SubPacketType.JoinGame]: JoinGame,
  [SubPacketType.JoinGameError]: JoinGameError,
  [SubPacketType.PlayerJoinedGame]: PlayerJoinedGame,
  [SubPacketType.StartGame]: StartGame,
  [SubPacketType.RemovePlayer]: RemovePlayer,
  [SubPacketType.GameData]: new GameData(),
  [SubPacketType.JoinedGame]: JoinedGame,
  [SubPacketType.EndGame]: EndGame,
  [SubPacketType.AlterGame]: AlterGame,
  [SubPacketType.MasterServers]: MasterServers,
  [SubPacketType.Redirect]: Redirect,
  [SubPacketType.GameSearch]: GameSearch,
  [SubPacketType.GameSearchResults]: GameSearchResults,
  [SubPacketType.KickPlayer]: KickPlayer,
  [SubPacketType.WaitingForHost]: WaitingForHost
}
