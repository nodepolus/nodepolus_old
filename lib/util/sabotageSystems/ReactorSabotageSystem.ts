import { AsyncEventEmitter, Events } from "../asyncEventEmitter";
import { SystemType } from "../../packets/packetElements/systemType";
import { Game } from "../game";
import { AmongUsMap } from "../../data/enums/amongUsMap";
import { Player } from "../player";

type ReactorSabotageEvents = Events & {
  
}

type ReactorConsoleEvents = Events & {

}

class ReactorConsole extends AsyncEventEmitter<ReactorConsoleEvents> {
  constructor(public reactorSabotageSystem: ReactorSabotageSystem) {
    super()
  }
}

export class ReactorSabotageSystem extends AsyncEventEmitter<ReactorSabotageEvents> {
  countdown:number;
  playerConsolePairs: Map<Player, ReactorConsole>;
  consoles:ReactorConsole[] = [new ReactorConsole(this), new ReactorConsole(this)]
  constructor(public readonly game: Game) {
    super();
    if (game.shipStatus?.Components[0].Data?.type == "ShipStatus") {
      let d = game.shipStatus?.Components[0].Data?.systems[game.room.settings.Map == AmongUsMap.POLUS ? SystemType.Laboratory : SystemType.Reactor].data
      if(d.type == "ReactorSystem") {
        this.countdown = d.Countdown;
        this.playerConsolePairs = new Map();
        [...d.UserConsolePairs.entries()].forEach(entry => {
          let playerID = entry[0];
          let consoleID = entry[1];
          let player = game.players.find((p) => p.ID == playerID);
          if(!player) {
            throw new Error("Unknown player ID: " + playerID)
          }
          this.playerConsolePairs.set(player, this.consoles[consoleID]);
        })
      }
    }
    // Issue was that "this.isSabotaged" is being used before assigned,
    // even though it was assigned 3 lines above.
    if (
      //@ts-ignore
      typeof this.countdown == "undefined" ||
      //@ts-ignore
      typeof this.playerConsolePairs == "undefined"
    ) {
      throw new Error("Was unable to find SimpleCommsSystem");
    }
  }
}