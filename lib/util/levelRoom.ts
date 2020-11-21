import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import { StaticRoomData } from "../data/mapData/types";
import { Level } from "./level";

export type LevelRoomEvents = Events & {
  
}

export class LevelRoom extends AsyncEventEmitter<LevelRoomEvents> {
  constructor(staticRoomData: StaticRoomData, public level: Level) {
    super()
  }
}