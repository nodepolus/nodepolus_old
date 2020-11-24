import { AsyncEventEmitter, Events } from "../asyncEventEmitter";
import { Level } from "../level";

type ElectricalSabotageEvents = Events & {

}

type SwitchEvents = Events & {
  
}

export class Switch extends AsyncEventEmitter<SwitchEvents> {
  constructor(public readonly level: Level, public readonly state:boolean, public readonly prefferedState: boolean) {
    super()
  }
}

export class ElectricalSabotageSystem extends AsyncEventEmitter<ElectricalSabotageEvents> {
  constructor(public readonly level: Level) {
    super();
    if(level.shipStatus?.Components[0].Data)
    this[0] = new Switch(level, );
    this[1] = new Switch();
    this[2] = new Switch();
    this[3] = new Switch();
    this[4] = new Switch();
  }
  public 0: Switch;
  public 1: Switch;
  public 2: Switch;
  public 3: Switch;
  public 4: Switch;
}