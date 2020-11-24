import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import { Room } from "./room";
import { AmongUsMap } from "../data/enums/amongUsMap";
import { StaticMapData, Collider, StaticDoorData, DoorOrientation } from "../data/mapData/types";
import { ElectricalSabotageSystem } from "./sabotageSystems/ElectricalSabotageSystem";
import { LevelRoom } from "./levelRoom";
import { Vent } from "./vent";
import StaticPolusData from "../data/mapData/polus"
import { SystemType } from "../packets/packetElements/systemType";
import { ObjectType } from "../packets/subpackets/gameDataPackets/spawn";
import { IGameObject } from "./gameObject";
import { BasicCommunicationsSabotageSystem } from "./sabotageSystems/BasicCommunicationsSabotageSystem";
import { Player } from "./player";
import { ReactorSabotageSystem } from "./sabotageSystems/ReactorSabotageSystem";
import { O2SabotageSystem } from "./sabotageSystems/O2SabotageSystem";
import { MiraCommuncationsSabotageSystem } from "./sabotageSystems/MiraCommunicationsSabotageSystem";

type LevelEvents = Events & {
  
}

type DoorEvents = Events & {

}

class Door extends AsyncEventEmitter<DoorEvents> {
  public readonly ID: number;
  public readonly orientation: DoorOrientation;
  public readonly collider: Collider;
  constructor(staticDoorData:StaticDoorData) {
    super()
    this.ID = staticDoorData.id
    this.orientation = staticDoorData.orientation
    this.collider = new Collider(staticDoorData.collider)
  }
}

type DoorSystemEvents = Events & {

};

class DoorSystem extends AsyncEventEmitter<DoorSystemEvents> {
  constructor(...doors:Door[]) {
    super()
  }
}

type SabotageSystem =
  | ElectricalSabotageSystem
  | BasicCommunicationsSabotageSystem
  | ReactorSabotageSystem
  | O2SabotageSystem
  | MiraCommuncationsSabotageSystem;

export class Game extends AsyncEventEmitter<LevelEvents> {
  public rooms: LevelRoom[];
  public vents: Vent[];
  public doors: DoorSystem;
  public readonly colliders: Collider[];
  private staticData: StaticMapData;
  public sabotageSystems: SabotageSystem[] = [];
  public readonly players: Player[] = [];
  constructor(public room: Room) {
    super();
    switch (room.settings.Map) {
      case AmongUsMap.POLUS:
        this.staticData = StaticPolusData;
        this.sabotageSystems[SystemType.Electrical] = new ElectricalSabotageSystem(this);
        this.sabotageSystems[SystemType.Communications] = new BasicCommunicationsSabotageSystem(this);
        this.sabotageSystems[SystemType.Laboratory] = new ReactorSabotageSystem(this);
        break;
      case AmongUsMap.MIRA_HQ:
        this.sabotageSystems[SystemType.Reactor] = new ReactorSabotageSystem(this);
        this.sabotageSystems[SystemType.Electrical] = new ElectricalSabotageSystem(this);
        this.sabotageSystems[SystemType.O2] = new O2SabotageSystem(this);
        this.sabotageSystems[SystemType.Communications] = new MiraCommuncationsSabotageSystem(this);
      // intentionally missing break
      case AmongUsMap.THE_SKELD:
        this.sabotageSystems[SystemType.Reactor] = new ReactorSabotageSystem(this);
        this.sabotageSystems[SystemType.Electrical] = new ElectricalSabotageSystem(this);
        this.sabotageSystems[SystemType.O2] = new O2SabotageSystem(this);
        this.sabotageSystems[SystemType.Communications] = new BasicCommunicationsSabotageSystem(this);
      // intentionally missing break
      default:
        throw new Error("Missing Static Data for map: " + room.settings.Map);
    }
    this.rooms = this.staticData.rooms.map(
      (StaitcRoomData) => new LevelRoom(StaitcRoomData, this)
    );
    this.vents = this.staticData.vents.map(
      (StaticVentData) => new Vent(StaticVentData, this)
    );
    this.doors = new DoorSystem(...this.staticData.doors);
    this.colliders = this.staticData.colliders;
  }
  get sabotage(): SabotageSystem | undefined {
    let ssc0 = this.shipStatus?.Components[0];
    if (ssc0 && ssc0.Data?.type == "ShipStatus") {
      ssc0.Data.systems.find((system) => {
        switch (system.data.type) {
          case "ReactorSystem":
            if ((<ReactorSabotageSystem>this.sabotageSystems[SystemType.Laboratory]).countdown != 10000) {
              return this.sabotageSystems[SystemType.Laboratory];
            }
            break;
          case "ElectricalSystem":
            if (
              (<ElectricalSabotageSystem>this.sabotageSystems[SystemType.Electrical]).sabotaged
            ) {
              return this.sabotageSystems[SystemType.Electrical];
            }
            break;
          case "MiraCommsSystem":
            if ((<MiraCommuncationsSabotageSystem>this.sabotageSystems[SystemType.Communications]).consoles.filter(c => c.completed).length < 2) {
              return this.sabotageSystems[SystemType.Communications];
            }
            break;
          case "O2System":
            if (
              (<O2SabotageSystem>this.sabotageSystems[SystemType.O2]).countdown != 10000
            ) {
              return this.sabotageSystems[SystemType.O2];
            }
            break;
          case "ReactorSystem":
            if ((<ReactorSabotageSystem>this.sabotageSystems[SystemType.Reactor]).countdown != 10000) {
              return this.sabotageSystems[SystemType.Reactor];
            }
            break;
          case "SimpleCommsSystem":
            if ((<BasicCommunicationsSabotageSystem>this.sabotageSystems[SystemType.Communications]).isSabotaged) {
              return this.sabotageSystems[SystemType.Communications];
            }
            break;
        }
      });
    }
    return undefined;
  }
  get shipStatus(): IGameObject | undefined {
    return this.room.GameObjects.find(
      (GO) =>
        Number(GO.SpawnID) == ObjectType.ShipStatus || // Skeld
        Number(GO.SpawnID) == ObjectType.AprilShipStatus || // April Fools Skeld
        Number(GO.SpawnID) == ObjectType.HeadQuarters || // MiraHQ
        Number(GO.SpawnID) == ObjectType.PlanetMap // Polus
    );
  }
}