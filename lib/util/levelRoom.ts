import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import { StaticRoomData } from "../data/mapData/types";
import { Game } from "./game";

export type LevelRoomEvents = Events & {
  
}

export class LevelRoom extends AsyncEventEmitter<LevelRoomEvents> {
  constructor(staticRoomData: StaticRoomData, public game: Game) {
    super()
  }
}