import {
  GameRoom,
  MiraHQRoom,
  PolusRoom,
  createRoom,
  SkeldRoom,
} from "./gameRoom";
import { Vent } from "./vent";

export enum MapType {
  Skeld = "Skeld",
  MiraHQ = "MiraHQ",
  Polus = "Polus",
}

export type RoomFromMap<T> = T extends MapType.MiraHQ
  ? MiraHQRoom
  : T extends MapType.Skeld
  ? SkeldRoom
  : T extends MapType.Polus
  ? PolusRoom
  : never;

export interface MapConfig<T> {
  map: T;
}

export class Map<Type extends MapType, Rooms = RoomFromMap<Type>> {
  config: MapConfig<Type>;
  rooms: Array<GameRoom<Rooms>>;

  constructor(config: MapConfig<Type>) {
    this.config = config;
    this.rooms = [];
  }

  getRoom(name: Rooms): GameRoom<Rooms> {
    const room = this.rooms.find((r) => r.name === name);
    if (!room) throw new Error("Could not find room: " + name);
    return room;
  }
}

export class MiraMap extends Map<MapType.MiraHQ> {
  constructor() {
    super({ map: MapType.MiraHQ });

    const reactorVent = new Vent();
    const launchpadVent = new Vent();
    const laboratoryVent = new Vent();
    const ventUnderDecontamination = new Vent();

    reactorVent.addConnections(launchpadVent, laboratoryVent);
    launchpadVent.addConnections(reactorVent, ventUnderDecontamination);

    this.rooms.push(createRoom(MiraHQRoom.Reactor, [reactorVent]));
    this.rooms.push(createRoom(MiraHQRoom.LockerRoom));
    this.rooms.push(createRoom(MiraHQRoom.Communications));
    this.rooms.push(createRoom(MiraHQRoom.MedBay));
    this.rooms.push(createRoom(MiraHQRoom.Office));
    this.rooms.push(createRoom(MiraHQRoom.Admin));
    this.rooms.push(createRoom(MiraHQRoom.Greenhouse));
    this.rooms.push(createRoom(MiraHQRoom.Storage));
    this.rooms.push(createRoom(MiraHQRoom.Cafeteria));
    this.rooms.push(createRoom(MiraHQRoom.Balcony));
    this.rooms.push(createRoom(MiraHQRoom.Launchpad, [launchpadVent]));
  }
}

const m = new MiraMap();
console.log(m.getRoom(MiraHQRoom.Reactor));
