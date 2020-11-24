import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import { StaticVentData } from "../data/mapData/types";
import { Game } from "./game";

export type VentEvents = Events & {};

export class Vent extends AsyncEventEmitter<VentEvents> {
  constructor(staticVentData: StaticVentData, public game: Game) {
    super();
  }
}