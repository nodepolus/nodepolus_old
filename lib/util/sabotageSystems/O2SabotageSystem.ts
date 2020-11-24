import { AsyncEventEmitter, Events } from "../asyncEventEmitter";
import { SystemType } from "../../packets/packetElements/systemType";
import { Game } from "../game";

type O2SabotageEvents = Events & {
  
}

type O2ConsoleEvents = Events & {

}

class O2Console extends AsyncEventEmitter<O2ConsoleEvents> {
  repaired: boolean = false;
  constructor(public O2SabotageSystem: O2SabotageSystem) {
    super()
  }
}

export class O2SabotageSystem extends AsyncEventEmitter<O2SabotageEvents> {
  countdown:number;
  consoles:O2Console[] = [new O2Console(this), new O2Console(this)]
  constructor(public readonly game: Game) {
    super();
    if (game.shipStatus?.Components[0].Data?.type == "ShipStatus") {
      let d = game.shipStatus?.Components[0].Data?.systems[SystemType.O2].data
      if(d.type == "O2System") {
        this.countdown = d.Countdown;
        [...d.Consoles].forEach(entry => {
          this.consoles[Number(entry)].repaired = true;
        })
      }
    }
    // Issue was that "this.isSabotaged" is being used before assigned,
    // even though it was assigned 3 lines above.
    if (
      //@ts-ignore
      typeof this.countdown == "undefined"
    ) {
      throw new Error("Was unable to find O2SabotageSystem");
    }
  }
}