import { AsyncEventEmitter, Events } from "../asyncEventEmitter";
import { SystemType } from "../../packets/packetElements/systemType";
import { Game } from "../game";

type BasicCommunicationsSabotageEvents = Events & {
  
}

export class BasicCommunicationsSabotageSystem extends AsyncEventEmitter<BasicCommunicationsSabotageEvents> {
  isSabotaged: boolean;
  constructor(public readonly game: Game) {
    super();
    if (game.shipStatus?.Components[0].Data?.type == "ShipStatus") {
      let d = game.shipStatus?.Components[0].Data?.systems[SystemType.Communications].data
      if(d.type == "SimpleCommsSystem") {
        this.isSabotaged = d.IsSabotaged;
      }
    }
    // Issue was that "this.isSabotaged" is being used before assigned,
    // even though it was assigned 3 lines above.
    //@ts-ignore
    if(typeof this.isSabotaged != 'boolean') {
      throw new Error("Was unable to find SimpleCommsSystem")
    }
  }
}