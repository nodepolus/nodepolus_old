import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import StaticPolusData from '../data/mapData/polus'
import { Room } from "./room";
import { AmongUsMap } from "../data/enums/amongUsMap";
import { StaticMapData, Collider, StaticDoorData, DoorOrientation } from "../data/mapData/types";
import { LevelRoom } from "./levelRoom";
import { ObjectType } from "../packets/subpackets/gameDataPackets/spawn";
import { IGameObject } from "./gameObject";
import { SystemType } from "../packets/packetElements/systemType";
import { Vent } from "./vent";
import { ElectricalSabotageSystem } from "./sabotageSystems/ElectricalSabotageSystem";

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

export class Level extends AsyncEventEmitter<LevelEvents> {
  public rooms: LevelRoom[];
  public vents: Vent[];
  public doors: DoorSystem;
  public readonly colliders: Collider[];
  private staticData: StaticMapData;
  public sabotageSystems: SabotageSystem[] = [];
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
            if (system.data.Countdown != 10000) {
              return this.sabotageSystems[SystemType.Laboratory];
            }
            break;
          case "ElectricalSystem":
            if (
              system.data.ActualSwitches.toString() !=
              system.data.ExpectedSwitches.toString()
            ) {
              return this.sabotageSystems[SystemType.Electrical];
            }
            break;
          case "MiraCommsSystem":
            if (system.data.CompletedConsoles.length == 0) {
              return this.sabotageSystems[SystemType.Communications];
            }
            break;
          case "O2System":
            if (system.data.Countdown != 10000) {
              return this.sabotageSystems[SystemType.O2];
            }
            break;
          case "ReactorSystem":
            if (system.data.Countdown != 10000) {
              return this.sabotageSystems[SystemType.Reactor];
            }
            break;
          case "SimpleCommsSystem":
            if (system.data.IsSabotaged) {
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