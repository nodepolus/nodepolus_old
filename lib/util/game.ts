<<<<<<< HEAD
export class Game {}
=======
import { Player } from "./player";
import { Room } from "./room";

export default class Game {
	public players: Player[] = [];
  public map: MapInstance;
  constructor(public room: Room) {}
}
>>>>>>> Continuing work on mapdata
