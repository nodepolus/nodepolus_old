import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import { StaticRoomData } from "../data/mapData/types";
import { Game } from "./Game";

export type LevelRoomEvents = Events & {
  
}

export class LevelRoom extends AsyncEventEmitter<LevelRoomEvents> {
  constructor(staticRoomData: StaticRoomData, public game: Game) {
    super()
  }
}