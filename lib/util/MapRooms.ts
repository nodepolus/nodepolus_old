import Polygon from "polygon"
import { Player } from "./player";
import { PolusMapInstance, MiraHQMapInstance, SkeldMapInstance } from "./MapInstance";
import { Vent } from "../data/enums/playerEnums";

class MapDoorSystem extends Array {

}

export class MapRoom {
  constructor(map: PolusMapInstance|MiraHQMapInstance|SkeldMapInstance) {

  }
  get players(): Player[] {
    return []
  }
  get vents(): Vent[] {
    return []
  }
  get doors(): MapDoorSystem {}
  boundingPolygon: Polygon;

}

export class Hallway extends MapRoom {
  connects: MapRoom[] = [];
}