import { BaseEvent } from "./baseEvents";
import { Player } from "../util/player";
import { LevelRoom } from "../util/levelRoom";

export enum VentMovementType {
  ENTERED = 0x00,
  EXITED = 0x01,
  MOVED = 0x02
}

export class PlayerVentEvent extends BaseEvent {
  constructor(public player: Player, public room: LevelRoom, public movementType: VentMovementType) {
    super();
  }
}
