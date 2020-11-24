import { BaseEvent } from "./baseEvents";
import { Player } from "../util/player";

export class AssignedImpostorsEvent extends BaseEvent {
  constructor(public players: Player[]) {
    super();
  }
}
