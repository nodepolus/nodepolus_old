import { MapRoom } from "./MapRooms";
import Game from "./game";

class BaseMapInstance {
  abstract name: string;
  abstract ID: number;
  abstract rooms: {};
  constructor(public game: Game) {}
}

export class PolusMapInstance extends BaseMapInstance {
  public name: string = "Polus";
  public ID: number = 2;
  public rooms = {
    Dropship: MapRoom = new MapRoom(this);
    Electrical: ElectricalRoom = new ElectricalRoom(this);
    Security: SecurityRoom = new SecurityRoom(this);
    Storage: MapRoom = new MapRoom(this);
    Laboratory: PolusLaboratoryRoom = new PolusLaboratoryRoom(this);
    O2: MapRoom = new MapRoom(this);
    Communications: CommunicationsRoom = new CommunicationsRoom(this);
    Office: MapRoom = new MapRoom(this);
    Specimen: MapRoom = new MapRoom(this);
    Weapons: MapRoom = new Weapons(this);
    Admin: MapRoom = new MapRoom(this);
    Outside: MapRoom = new MapRoom(this);
    LeftDecontamination: Decontamination = new Decontamination(this);
    RightDecontamination: Decontamination = new Decontamination(this);
    O2Hallway: Hallway = new Hallway(this);
    LeftSpecimenHallway: Hallway = new Hallway(this);
    RightSpecimenHallway: Hallway = new Hallway(this);
  }
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