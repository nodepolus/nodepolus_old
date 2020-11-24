import { AsyncEventEmitter, Events } from "../asyncEventEmitter";
import { SystemType } from "../../packets/packetElements/systemType";
import { Game } from "../game";
import { Player } from "../player";

type MiraCommunicationsSabotageEvents = Events & {
  
}

type MiraCommunicationsConsoleEvents = Events & {

}

class ReactorConsole extends AsyncEventEmitter<MiraCommunicationsConsoleEvents> {
  active: boolean = false;
  completed: boolean = false;
  constructor(public miraCommunicationsSabotageSystem: MiraCommuncationsSabotageSystem) {
    super();
  }
}

export class MiraCommuncationsSabotageSystem extends AsyncEventEmitter<MiraCommunicationsSabotageEvents> {
  public playerConsolePairs: Map<Player, ReactorConsole>;
  public consoles:ReactorConsole[] = [new ReactorConsole(this), new ReactorConsole(this)]
  constructor(public readonly game: Game) {
    super();
    if (game.shipStatus?.Components[0].Data?.type == "ShipStatus") {
      let d = game.shipStatus?.Components[0].Data?.systems[SystemType.Communications].data
      if(d.type == "MiraCommsSystem") {
        this.playerConsolePairs = new Map();
        [...d.ActiveConsoles].forEach(entry => {
          let playerID = entry[0];
          let consoleID = entry[1];
          let player = game.players.find((p) => p.ID == playerID);
          if(!player) {
            throw new Error("Unknown player ID: " + playerID)
          }
          this.playerConsolePairs.set(player, this.consoles[consoleID]);
        })
        this.consoles.forEach(c => c.completed = false)
        d.CompletedConsoles.forEach(i => this.consoles[i].completed = true)
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