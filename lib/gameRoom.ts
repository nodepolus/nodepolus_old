import { MapType, RoomFromMap } from "./map";
import { Player } from "./util/player";
import { Vent } from "./vent";
export enum SkeldRoom {
  Reactor = "Reactor",
  UpperEngine = "UpperEngine",
  LowerEngine = "LowerEngine",
  Security = "Security",
  MedBay = "MedBay",
  Electrical = "Electrical",
  Cafeteria = "Cafeteria",
  Storage = "Storage",
  Admin = "Admin",
  Communications = "Communications",
  O2 = "O2",
  Weapons = "Weapons",
  Shields = "Shields",
  Navigation = "Navigation",
}

export enum MiraHQRoom {
  Launchpad = "Launchpad",
  Reactor = "Reactor",
  LockerRoom = "LockerRoom",
  Communications = "Communications",
  MedBay = "MedBay",
  Office = "Office",
  Admin = "Admin",
  Greenhouse = "Greenhouse",
  Storage = "Storage",
  Cafeteria = "Cafeteria",
  Balcony = "Balcony",
}

export enum PolusRoom {
  Security = "Security",
  O2 = "O2",
  Electrical = "Electrical",
  Communications = "Communications",
  Weapons = "Weapons",
  Storage = "Storage",
  Office = "Office",
  Admin = "Admin",
  Laboratory = "Laboratory",
  Specimen = "Specimen",
}

export interface GameRoom<R> {
  name: R;
  players: Player[];
  doors: unknown[];
  vents: Vent[];
}

export const createRoom = <
  Map extends MapType,
  PossibleRooms = RoomFromMap<Map>
>(
  name: PossibleRooms,
  vents: Array<Vent> = []
): GameRoom<PossibleRooms> => {
  const room = {
    name,
    players: [],
    doors: [],
    vents: vents,
  };

  return room;
};
