import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import { StaticVentData } from "../data/mapData/types";
import { Level } from "./level";

export type VentEvents = Events & {};

export class Vent extends AsyncEventEmitter<VentEvents> {
  constructor(staticVentData: StaticVentData, public level: Level) {
    super();
  }
}