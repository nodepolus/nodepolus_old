import { Vector2, Vector3 } from "../../packets/packetElements/vector";
import Polygon from "polygon";
import { SystemType } from "../../packets/packetElements/systemType";
import { Door } from "../../util/MapRooms";
// import { PolusVents } from "../enums/playerEnums";

export enum DoorOrientation {
  VERTICAL = 0x00,
  HORIZONTAL = 0x01,
}

export interface StaticDoorData {
  id: number;
  orientation: DoorOrientation;
  collider: RawStaticColliderData;
}

export interface StaticRoomData {
  name: string;
  id: SystemType;
  doors: number[];
  vents: number[];
  collision: RawStaticColliderData[];
  boundaries: RawStaticColliderData;
}

export interface StaticVentData {
  id: number;
  position: Vector2;
  collider: RawStaticColliderData;
}

export type TaskLength = 'short' | 'long' | 'common'

export interface StaticTaskData {
  id: number;
  collider: RawStaticColliderData;
  name: string;
  isVisual: boolean;
  length: TaskLength;
  stepCount: number;
  timer?: number;
}


export type RawStaticColliderData = RawStaticBoxColliderData | RawStaticPolygonColliderData;

export interface RawStaticPolygonColliderData {
  type: 'polygon' | 'edge',
  name: string,
  position: {
    x: number,
    y: number,
    z: number
  },
  offset: {
    x: number,
    y: number
  },
  rotation: {
    x: number,
    y: number,
    z: number
  },
  bounds: {
    max: {
      x: number,
      y: number
    },
    min: {
      x: number,
      y: number
    }
  },
  isTrigger: boolean,
  enabled: boolean,
  isActiveAndEnabled: boolean,
  tag: string,
  points: {
    x: number,
    y: number
  }[]
}
export interface RawStaticBoxColliderData {
  type: "box";
  name: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  offset: {
    x: number;
    y: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  bounds: {
    max: {
      x: number;
      y: number;
    };
    min: {
      x: number;
      y: number;
    };
  };
  isTrigger: boolean;
  enabled: boolean;
  isActiveAndEnabled: boolean;
  tag: string;
  size: {
    x: number,
    y: number
  }
}

export interface StaticMapData {
  doors: Door[];
  rooms: StaticRoomData[];
  vents: StaticVentData[];
  tasks: StaticTaskData[];
  colliders: Collider[];
}

export class Collider {
  public type: 'box' | 'polygon' | 'edge';
  public name: string;
  public position: Vector3;
  public offset: Vector2;
  public rotation: Vector3;
  public isTrigger: boolean;
  public polygon: Polygon;
  constructor(sd: RawStaticColliderData) {
    if (sd.type == "edge" || sd.type == "polygon") {
      this.type = sd.type
      this.name = sd.name
      this.position = new Vector3(sd.position.x, sd.position.y, sd.position.z)
      this.offset = new Vector2(sd.offset.x, sd.offset.y)
      this.rotation = new Vector3(sd.rotation.x, sd.rotation.y, sd.rotation.z)
      this.isTrigger = sd.isTrigger
      this.polygon = new Polygon(sd.points)
    } else {
      if(sd.type == 'box') {
        this.type = sd.type;
        this.name = sd.name;
        this.position = new Vector3(sd.position.x, sd.position.y, sd.position.z);
        this.offset = new Vector2(sd.offset.x, sd.offset.y);
        this.rotation = new Vector3(sd.rotation.x, sd.rotation.y, sd.rotation.z);
        this.isTrigger = sd.isTrigger;
        this.polygon = new Polygon([
          { x: sd.position.x - sd.size.x, y: sd.position.y - sd.size.y },
          { x: sd.position.x + sd.size.x, y: sd.position.y - sd.size.y },
          { x: sd.position.x + sd.size.x, y: sd.position.y + sd.size.y },
          { x: sd.position.x - sd.size.x, y: sd.position.y + sd.size.y },
          { x: sd.position.x - sd.size.x, y: sd.position.y - sd.size.y },
        ]);
      } else {
        throw new Error("Unknown collider type: " + sd.type);
      }
    }
  }
}