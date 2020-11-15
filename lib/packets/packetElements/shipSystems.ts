import PolusBuffer from "../../util/polusBuffer";
import { Room } from "../../util/room";

interface System {
  parse(pb: PolusBuffer, room: Room): void;
  serialize(pb: PolusBuffer, room: Room): void;
}

export class DoorSystem implements System {
  public doors: [];

  constructor() {
    this.doors = [];
  }

  parse(pb: PolusBuffer, room: Room): void {
    throw new Error("Method not implemented.");
  }
  serialize(pb: PolusBuffer, room: Room): void {
    throw new Error("Method not implemented.");
  }
}
