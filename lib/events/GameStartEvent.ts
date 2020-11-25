import { Game } from "../util/Game";
import { BaseEvent } from ".";

export class GameStartEvent extends BaseEvent {
  constructor(public game: Game) {
    super();
  }
}
