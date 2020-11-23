import { MapRoom, Hallway } from "./MapRooms";
import Game from "./game";
import StaticPolusData from "../data/mapData/polus";

abstract class BaseMapInstance {
  abstract name: string;
  abstract ID: number;
  abstract rooms: {};
  constructor(public game: Game) {}
}

export class PolusMapInstance extends BaseMapInstance {
  public name: string = "Polus";
  public ID: number = 2;
  public rooms = {
    Dropship: new MapRoom(this, StaticPolusData.rooms[15]),
    Electrical: new ElectricalRoom(this, StaticPolusData.rooms[0]),
    Security: new SecurityRoom(this, StaticPolusData.rooms[1]),
    Storage: new MapRoom(this, StaticPolusData.rooms[14]),
    Laboratory: new PolusLaboratoryRoom(this, StaticPolusData.rooms[13]),
    O2: new MapRoom(this, StaticPolusData.rooms[3]),
    Communications: new CommunicationsRoom(this, StaticPolusData.rooms[5]),
    Office: new MapRoom(this, StaticPolusData.rooms[6]),
    Specimen: new MapRoom(this, StaticPolusData.rooms[9]),
    Weapons: new MapRoom(this, StaticPolusData.rooms[4]),
    Admin: new MapRoom(this, StaticPolusData.rooms[7]),
    LeftDecontamination: new Decontamination(this, StaticPolusData.rooms[8]),
    RightDecontamination: new Decontamination(this, StaticPolusData.rooms[12]),
    O2Hallway: new Hallway(this, StaticPolusData.rooms[2]),
    LeftSpecimenHallway: new Hallway(this, StaticPolusData.rooms[8]),
    RightSpecimenHallway: new Hallway(this, StaticPolusData.rooms[10]),
  };
  constructor(public game: Game) {
    super(game);
  }
}

export class MiraHQMapInstance extends BaseMapInstance {
  public name: string = "Mira HQ";
  public ID: number = 1;
  public Launchpad: Launchpad = new Launchpad()
  public Reactor: Reactor = new Reactor()

}

export class SkeldMapInstance extends BaseMapInstance {
  public name: string = "The Skeld";
  public ID: number = 0;
}

export type MapInstance = PolusMapInstance | MiraHQMapInstance | SkeldMapInstance;