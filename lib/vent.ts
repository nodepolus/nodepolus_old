import { Player } from "./util/player";

export class Vent {
  player: Player | null;
  connections: Array<Vent>;

  constructor(connections: Array<Vent> = []) {
    this.player = null;
    this.connections = connections;
  }

  addConnections(...connections: Array<Vent>) {
    this.connections = [...this.connections, ...connections];
  }
}
