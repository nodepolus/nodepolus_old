import { AsyncEventEmitter, Events } from "../asyncEventEmitter";
import { Game } from "../game";
import { SystemType } from "../../packets/packetElements/systemType";

type ElectricalSabotageEvents = Events & {

}

type SwitchEvents = Events & {
  
}

export class Switch extends AsyncEventEmitter<SwitchEvents> {
  constructor(
    public readonly system: ElectricalSabotageSystem,
    public readonly state: boolean,
    public readonly prefferedState: boolean
  ) {
    super();
  }
}

export class ElectricalSabotageSystem extends AsyncEventEmitter<ElectricalSabotageEvents> {
  constructor(public readonly game: Game) {
    super();
    if (game.shipStatus?.Components[0].Data?.type == "ShipStatus") {
      let d = game.shipStatus?.Components[0].Data?.systems[SystemType.Electrical].data
      if(d.type == "ElectricalSystem") {
        this[0] = new Switch(this, d.ActualSwitches[0], d.ExpectedSwitches[0]);
        this[1] = new Switch(this, d.ActualSwitches[1], d.ExpectedSwitches[1]);
        this[2] = new Switch(this, d.ActualSwitches[2], d.ExpectedSwitches[2]);
        this[3] = new Switch(this, d.ActualSwitches[3], d.ExpectedSwitches[3]);
        this[4] = new Switch(this, d.ActualSwitches[4], d.ExpectedSwitches[4]);
      }
    }
    if(!this[0]) throw new Error("fucking typescript bullshit this should never happen")
  }
  public 0: Switch;
  public 1: Switch;
  public 2: Switch;
  public 3: Switch;
  public 4: Switch;
  get sabotaged() {
    return (
      this[0].state != this[0].prefferedState ||
      this[1].state != this[1].prefferedState ||
      this[2].state != this[2].prefferedState ||
      this[3].state != this[3].prefferedState ||
      this[4].state != this[4].prefferedState
    )
  }
}