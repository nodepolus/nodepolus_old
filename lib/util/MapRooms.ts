import Polygon from "polygon"
import { Player } from "./player";
import { PolusMapInstance, MiraHQMapInstance, SkeldMapInstance } from "./MapInstance";
import { StaticRoomData, StaticMapData, StaticVentData, Collider, DoorOrientation, StaticDoorData } from "../data/mapData/types";
import { GameDataPacketType } from "../packets/subpackets/gameData";
import { SystemType } from "../packets/packetElements/systemType";
import { RPCPacketType } from "../packets/subpackets/gameDataPackets/rpc";
import { ObjectType } from "../packets/subpackets/gameDataPackets/spawn";
import { RepairAmount } from "../packets/subpackets/gameDataPackets/rpcPackets/repairSabotage";
import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import { PlayerMovedRoomEvent } from "../events/playerEnteredRoomEvent";
import { RoomSabotagedEvent } from "../events/roomSabotagedEvent";
import { DoorEvent } from "../events/doorEvent";
import { Vector2 } from "../packets/packetElements/vector";
import { PlayerVentEvent } from "../events/PlayerVentEvent";

type DoorEvents = Events & {
  closed: (event: DoorEvent) => Promise<void>;
  opened: (event: DoorEvent) => Promise<void>;
}

export class Door extends AsyncEventEmitter<DoorEvents> {
  orientation: DoorOrientation;
  ID: number;
  collider: Collider;
  constructor(data: StaticDoorData) {
    super()
    this.orientation = data.orientation;
    this.ID = data.id
    this.collider = new Collider(data.collider)
  }
}

export class MapDoorSystem extends AsyncEventEmitter<DoorEvents> {
  [index: number]: Door;
  constructor(...doors: StaticDoorData[]) {
    super()
    doors.forEach((door, idx) => {
      this[idx] = new Door(door);
    })
  }
}

type VentEvents = Events & {
  playerEntered: (event: PlayerVentEvent) => Promise<void>;
  playerExited: (event: PlayerVentEvent) => Promise<void>;
}

export class Vent extends AsyncEventEmitter<VentEvents> {
  public ID: number;
  public position: Vector2;
  public collider: Collider;

  constructor(ventData: StaticVentData) {
    super()
    this.ID = ventData.id
    this.position = ventData.position
    this.collider = new Collider(ventData.collider)
  }
}

type MapRoomEvents = Events & {
  playerEntered: (event: PlayerMovedRoomEvent) => Promise<void>;
  playerExited: (event: PlayerMovedRoomEvent) => Promise<void>;
  sabotaged: (event: RoomSabotagedEvent) => Promise<void>;
  repaired: (event: RoomSabotagedEvent) => Promise<void>;
  sabotageUpdate: (event: RoomSabotagedEvent) => Promise<void>;
};

export class MapRoom extends AsyncEventEmitter<MapRoomEvents> {
  constructor(
    public map: PolusMapInstance | MiraHQMapInstance | SkeldMapInstance,
    roomData: StaticRoomData,
    mapData: StaticMapData
  ) {
    super()
    this.doors = new MapDoorSystem(...mapData.doors.filter(door => roomData.doors.includes(door.ID)))
    this.vents = roomData.vents.map(id => {
      let vd = mapData.vents.find(v => v.id == id)
      if(vd) {
        return new Vent(vd)
      } else {
        throw new Error("STATIC_DATA_ERR. Data for Vent ID: " + id + " NOT FOUND")
      }
    })
    this.boundingPolygon = new Collider(roomData.boundaries).polygon
  }
  get players(): Player[] {
    // ts ignore due to error
    // (Player || undefined)[] can't be cast to Player[]
    // The state of undefined[] is impossible however due to the filter.
    // if c.player was undefined, .filter(p=>p&&...) would remove it.
    //@ts-ignore
    return this.map.game.room.connections.map(c=>c.player).filter(p=>p&&this.boundingPolygon.containsPoint(p.rawPosition))
  }
  vents:Vent[]
  doors:MapDoorSystem;
  boundingPolygon: Polygon;
}

abstract class SabotageableMapRoom extends MapRoom {
  constructor(
    public map: PolusMapInstance | MiraHQMapInstance | SkeldMapInstance,
    roomData: StaticRoomData,
    mapData: StaticMapData
  ) {
    super(map, roomData, mapData);
  }
  abstract get sabotaged(): boolean;
  abstract sabotage(): void;
  abstract repair(): void;
  public sendReapirPacket = (
    RepairAmount: RepairAmount,
    System: SystemType
  ) => {
    if (this.map.game.room.host) {
      let shipStatusNetID = this.map.game.room.GameObjects.find(
        (go) =>
          Number(go.SpawnID) == ObjectType.ShipStatus ||
          Number(go.SpawnID) == ObjectType.HeadQuarters ||
          Number(go.SpawnID) == ObjectType.PlanetMap ||
          Number(go.SpawnID) == ObjectType.AprilShipStatus
      )?.Components[0].netID;
      let sabotagerID = this.map.game.room.connections.find(
        (c) => c.player?.isImpostor == (System == SystemType.Sabotage)
      )?.netIDs[0];
      if (shipStatusNetID && sabotagerID) {
        this.map.game.room.broadcastToAll({
          type: "GameData",
          RoomCode: this.map.game.room.code,
          Packets: [
            {
              type: GameDataPacketType.RPC,
              NetID: shipStatusNetID,
              RPCFlag: RPCPacketType.RepairSabotage,
              Packet: {
                System,
                RepairerNetID: sabotagerID,
                RepairAmount,
              },
            },
          ],
        });
      } else {
        throw new Error("room is missing an impostor/crewmate or a shipstatus");
      }
    } else {
      throw new Error("room has no host");
    }
  };
}

export class Hallway extends MapRoom {
  connects: MapRoom[] = [];
}

export class Switch {
  constructor(private switchSystem: SwitchSystem, public index: number){}
  state: boolean = true
  expectedState: boolean = true
  flip() {
    this.switchSystem.room.sendReapirPacket({switchFlipped: this.index}, SystemType.Electrical)
  }
}

type SwitchSystemEvents = Events & {
  switchFlipped: (switchIndex: number) => Promise<void>
}

export class SwitchSystem extends AsyncEventEmitter<SwitchSystemEvents> {
  private switches: Switch[] = new Array(5)
    .fill(1)
    .map((e, i) => new Switch(this, i));
  constructor(public room: ElectricalRoom) {
    super();
  }
  fix() {
    let isig = this.room.map.game.room.host?.inGroup;
    if (!isig) {
      this.room.map.game.room.startPacketGroupBroadcastToAll();
    }
    this.switches.forEach((sw) => {
      if (sw.state != sw.expectedState) sw.flip();
    });
    if (!isig) {
      this.room.map.game.room.endPacketGroupBroadcastToAll();
    }
  }
  get 0() {return this.switches[0]}
  get 1() {return this.switches[1]}
  get 2() {return this.switches[2]}  // there must be a better way to do this, but i'm tired.
  get 3() {return this.switches[3]}
  get 4() {return this.switches[4]}
}

export class ElectricalRoom extends SabotageableMapRoom {
  switches: SwitchSystem = new SwitchSystem(this);
  get sabotaged():boolean {
    let ssgo = this.map.game.room.GameObjects.find(
      (go) =>
        Number(go.SpawnID) == ObjectType.ShipStatus ||
        Number(go.SpawnID) == ObjectType.HeadQuarters ||
        Number(go.SpawnID) == ObjectType.PlanetMap ||
        Number(go.SpawnID) == ObjectType.AprilShipStatus
    )?.Components[0].Data
    if(ssgo?.type == "ShipStatus") {
      let sd = ssgo.systems.find(s => s.system == SystemType.Electrical)?.data
      if(sd && sd.type == "ElectricalSystem") {
        return sd.ExpectedSwitches.toString() != sd.ActualSwitches.toString();
      }
    }
    throw new Error("Error reading component data")
  }
  sabotage() {
    this.sendReapirPacket({systemID: SystemType.Electrical}, SystemType.Sabotage)
  };
  repair() {
    this.switches.fix()
  }
}