import { SystemType } from "./systemType";
import { Room } from "../../util/room";
import { PolusBuffer } from "../../util/polusBuffer";
import { AmongUsMap } from "../../data/enums/amongUsMap";
import { ObjectType } from "../subpackets/gameDataPackets/spawn";
import { StateByte, StateByteInterface } from "./stateByte";
import { DeconStateByte, DeconStateByteInterface } from "./deconStateByte";
import {
  ComponentData,
  MeetingHud,
  GameDataPlayerData,
  GameData,
  PlayerVoteBanSystem,
  ElectricalSystem,
  UserListSystem,
  CommsSystem,
  MiraCommsSystem,
  SimpleCommsSystem,
  O2System,
  DoorSystem,
  SabotageSystem,
  DeconSystem,
  ReactorSystem,
  ShipStatus,
  PlayerControl,
  CustomTransformData,
  PolusDoorSystem,
} from "./componentTypes";
import { Vector2 } from "./vector";

//stolen from SO
function arraysEqual(a: any[], b: any[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// TODO: Type these properly, probably need to move away from using Map
type SystemHandler = {
  read: (buf: PolusBuffer, rm: Room, spawn?: boolean) => any;
  write: (
    obj: any,
    buf: PolusBuffer,
    rm: Room,
    spawn?: boolean,
    old?: any
  ) => void;
  check: (obj: any, old: any) => boolean;
};

const SYSTEM_HANDLER: Map<SystemType, SystemHandler> = new Map();

/// *** Electrical *** ///

SYSTEM_HANDLER.set(SystemType.Electrical, {
  read: (buf, rm) => {
    let expected = buf
      .readU8()
      .toString(2)
      .padStart(5, "0")
      .split("")
      .map((c) => c == "1");
    let actual = buf
      .readU8()
      .toString(2)
      .padStart(5, "0")
      .split("")
      .map((c) => c == "1");
    return {
      type: "ElectricalSystem",
      ExpectedSwitches: expected,
      ActualSwitches: actual,
      Value: buf.readU8(),
    };
  },
  write: (obj: ElectricalSystem, buf, rm) => {
    buf.writeU8(
      parseInt(
        obj.ExpectedSwitches.map((e: boolean) => (e ? "1" : "0")).join(""),
        2
      )
    );
    buf.writeU8(
      parseInt(
        obj.ActualSwitches.map((e: boolean) => (e ? "1" : "0")).join(""),
        2
      )
    );
    buf.writeU8(obj.Value);
  },
  check: (obj: ElectricalSystem, old: ElectricalSystem) => {
    if (obj.Value !== old.Value) return true;
    if (!arraysEqual(obj.ExpectedSwitches, old.ExpectedSwitches)) return true;
    return !arraysEqual(obj.ActualSwitches, old.ActualSwitches);
  },
});

/// *** Medbay *** ///

SYSTEM_HANDLER.set(SystemType.Medbay, {
  read: (buf, rm) => {
    const length = Number(buf.readVarInt());
    const users = [];
    for (let i = 0; i < length; i++) users.push(buf.readU8());
    return {
      type: "MedbaySystem",
      Users: users,
    };
  },
  write: (obj: UserListSystem, buf, rm) => {
    buf.writeVarInt(BigInt(obj.Users.length));
    for (let i = 0; i < obj.Users.length; i++) {
      buf.writeU8(obj.Users[i]);
    }
  },
  check: (obj: UserListSystem, old: UserListSystem) => {
    return !arraysEqual(obj.Users, old.Users);
  },
});

/// *** Communications *** ///

SYSTEM_HANDLER.set(SystemType.Communications, {
  read: (buf, rm) => {
    if (rm.settings.Map == AmongUsMap.MIRA_HQ) {
      let pairsLength = Number(buf.readVarInt());
      let userConsolePairs: number[][] = [];

      for (let i = 0; i < pairsLength; i++) {
        userConsolePairs.push([buf.readU8(), buf.readU8()]);
      }

      let completedLength = Number(buf.readVarInt());
      let completed: number[] = [];

      for (let i = 0; i < completedLength; i++) {
        completed[i] = buf.readU8();
      }
      return {
        type: "MiraCommsSystem",
        ActiveConsoles: userConsolePairs,
        CompletedConsoles: completed,
      };
    } else {
      return {
        type: "SimpleCommsSystem",
        IsSabotaged: buf.readBoolean(),
      };
    }
  },
  write: (obj: CommsSystem, buf, rm) => {
    if (rm.settings.Map == AmongUsMap.MIRA_HQ) {
      let sys: MiraCommsSystem = <MiraCommsSystem>obj;
      buf.writeVarInt(BigInt(sys.ActiveConsoles.length));
      for (let i = 0; i < sys.ActiveConsoles.length; i++) {
        buf.writeU8(sys.ActiveConsoles[i][0]);
        buf.writeU8(sys.ActiveConsoles[i][1]);
      }
      buf.writeVarInt(BigInt(sys.CompletedConsoles.length));
      for (let i = 0; i < sys.CompletedConsoles.length; i++) {
        buf.writeU8(sys.CompletedConsoles[i]);
      }
    } else {
      buf.writeBoolean((<SimpleCommsSystem>obj).IsSabotaged);
    }
  },
  check: (curr: CommsSystem, old: CommsSystem) => {
    if ("IsSabotaged" in curr && "IsSabotaged" in old) {
      // assume SimpleComsSystem
      return curr.IsSabotaged != old.IsSabotaged;
    } else {
      // assume MiraComsSystem
      if (
        !arraysEqual(
          (<MiraCommsSystem>curr).ActiveConsoles.flat(),
          (<MiraCommsSystem>old).ActiveConsoles.flat()
        )
      )
        return true;
      if (
        !arraysEqual(
          (<MiraCommsSystem>curr).CompletedConsoles.flat(),
          (<MiraCommsSystem>old).CompletedConsoles.flat()
        )
      )
        return true;
    }

    return false;
  },
});

/// *** Security *** ///

SYSTEM_HANDLER.set(SystemType.Security, {
  read: (buf, rm) => {
    const length = Number(buf.readVarInt());
    const users = [];
    for (let i = 0; i < length; i++) users.push(buf.readU8());
    return {
      type: "SecuritySystem",
      Users: users,
    };
  },
  write: (obj: UserListSystem, buf, rm) => {
    buf.writeVarInt(BigInt(obj.Users.length));
    for (let i = 0; i < obj.Users.length; i++) {
      buf.writeU8(obj.Users[i]);
    }
  },
  check: (obj: UserListSystem, old: UserListSystem) => {
    return !arraysEqual(obj.Users, old.Users);
  },
});

/// *** Reactor *** ///
const reactorHandler: SystemHandler = {
  read: (buf, rm): ReactorSystem => {
    const Countdown = buf.readFloat32();
    const length = Number(buf.readVarInt());
    const pairs = new Map();
    for (let i = 0; i < length; i++) {
      pairs.set(buf.readU8(), buf.readU8());
    }
    return {
      type: "ReactorSystem",
      Countdown,
      UserConsolePairs: pairs,
    };
  },
  write: (obj: ReactorSystem, buf, rm) => {
    buf.writeFloat32(obj.Countdown);
    let entries = [...obj.UserConsolePairs.entries()];
    buf.writeVarInt(BigInt(entries.length));
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      buf.writeU8(entry[0]);
      buf.writeU8(entry[1]);
    }
  },
  check: (curr: ReactorSystem, old: ReactorSystem) => {
    if (curr.Countdown != old.Countdown) return true;
    let currentries = [...curr.UserConsolePairs.entries()];
    let oldentries = [...old.UserConsolePairs.entries()];
    if (!arraysEqual(currentries.flat(), oldentries.flat())) return true;
    return false;
  },
};

SYSTEM_HANDLER.set(SystemType.Reactor, reactorHandler);

/// *** O2 *** ///

SYSTEM_HANDLER.set(SystemType.O2, {
  read: (buf, rm) => {
    const Countdown = buf.readFloat32();
    const length = Number(buf.readVarInt());
    const consoles = [];
    for (let i = 0; i < length; i++) {
      consoles.push(buf.readVarInt());
    }
    return {
      type: "O2System",
      Countdown,
      Consoles: consoles,
    };
  },
  write: (obj: O2System, buf, rm) => {
    buf.writeFloat32(obj.Countdown);
    buf.writeVarInt(BigInt(obj.Consoles.length));
    for (let i = 0; i < obj.Consoles.length; i++) {
      buf.writeVarInt(obj.Consoles[i]);
    }
  },
  check: (curr: O2System, old: O2System) => {
    if (curr.Countdown != old.Countdown) return true;
    return !arraysEqual(curr.Consoles, old.Consoles);
  },
});

/// *** Doors *** ///

export const SYSTEM_DOOR_COUNT = [13, 0, 12];
SYSTEM_HANDLER.set(SystemType.Doors, {
  read: (buf, rm, spawn) => {
    if (rm.settings.Map == AmongUsMap.POLUS) {
      // console.log("FUCK READING POLUS DOORS", buf.buf.toString("hex"))
      let timerLength = buf.readU8();
      let timers: Map<number, number> = new Map();
      for (let i = 0; i < timerLength; i++) {
        timers.set(buf.readU8(), buf.readFloat32());
      }
      let doors: boolean[] = [];

      // 12 manual doors + 4 decontamination doors
      for (let i = 0; i < 16; i++) {
        doors[i] = buf.readBoolean();
      }

      return {
        type: "DoorSystem",
        Timers: timers,
        Doors: doors,
      };
    } else {
      let doors = [];
      let length = SYSTEM_DOOR_COUNT[rm.settings.Map];
      let mask: number | null = null;

      if (!spawn) {
        mask = Number(buf.readVarInt());
      }

      for (let i = 0; i < length; i++) {
        if (spawn) {
          doors[i] = buf.readBoolean();
        } else {
          if (mask !== null) {
            if ((mask & (1 << i)) !== 0) {
              doors[i] = buf.readBoolean();
            }
          }
        }
      }
      return {
        type: "DoorSystem",
        Doors: doors,
      };
    }
  },
  write: (
    obj: DoorSystem | PolusDoorSystem,
    buf: PolusBuffer,
    rm: Room,
    spawn?: boolean,
    old?: DoorSystem | PolusDoorSystem
  ) => {
    if (rm.settings.Map == AmongUsMap.POLUS) {
      buf.writeU8((<PolusDoorSystem>obj).Timers.size);
      for (let [system, timer] of (<PolusDoorSystem>obj).Timers) {
        buf.writeU8(system);
        buf.writeFloat32(timer);
      }
      for (let door of (<PolusDoorSystem>obj).Doors) {
        buf.writeBoolean(door);
      }

      // console.log("FUCK WRITING POLUS DOORS", buf.buf.toString("hex"))
    } else {
      if (!spawn) {
        let maskBuf = new PolusBuffer();
        let doorBuf = new PolusBuffer();
        let mask = 0;
        for (let i = 0; i < obj.Doors.length; i++) {
          if (typeof obj.Doors[i] !== "undefined") {
            doorBuf.writeBoolean(obj.Doors[i]);
            mask |= 1 << i;
          }
        }
        maskBuf.writeVarInt(BigInt(mask));
        buf.writeBytes(maskBuf);
        buf.writeBytes(doorBuf);
      } else {
        for (let i = 0; i < obj.Doors.length; i++) {
          buf.writeBoolean(obj.Doors[i]);
        }
      }
    }
  },
  check: (
    curr: DoorSystem | PolusDoorSystem,
    old: DoorSystem | PolusDoorSystem
  ) => {
    return !arraysEqual(curr.Doors, old.Doors);
  },
});

/// *** Sabotage *** ///

SYSTEM_HANDLER.set(SystemType.Sabotage, {
  read: (buf, rm) => {
    return {
      type: "SabotageSystem",
      Timer: buf.readFloat32(),
    };
  },
  write: (obj: SabotageSystem, buf, rm) => {
    buf.writeFloat32(obj.Timer);
  },
  check: (curr: SabotageSystem, old: SabotageSystem) => {
    return curr.Timer !== old.Timer;
  },
});

const decontaminationHandler: SystemHandler = {
  read: (buf, rm) => {
    return {
      type: "DeconSystem",
      Timer: buf.readU8(),
      State: DeconStateByte.parse(buf.readU8()),
    };
  },
  write: (obj: DeconSystem, buf, rm) => {
    buf.writeU8(obj.Timer);
    buf.writeU8(
      DeconStateByte.serialize(
        <DeconStateByteInterface>(<DeconSystem>obj).State
      )
    );
  },
  check: (curr: DeconSystem, old: DeconSystem) => {
    if (curr.Timer != old.Timer) return true;
    if (curr.State != old.State) return true;
    return false;
  },
};

SYSTEM_HANDLER.set(SystemType.Decontamination, decontaminationHandler);

SYSTEM_HANDLER.set(SystemType.Laboratory, reactorHandler);
SYSTEM_HANDLER.set(SystemType.Decontamination2, decontaminationHandler);

const MAP_SYSTEM_ORDER = [
  [
    SystemType.Reactor,
    SystemType.Electrical,
    SystemType.O2,
    SystemType.Medbay,
    SystemType.Security,
    SystemType.Communications,
    SystemType.Doors,
    SystemType.Sabotage,
  ],
  [
    SystemType.Reactor,
    SystemType.Electrical,
    SystemType.O2,
    SystemType.Medbay,
    SystemType.Communications,
    SystemType.Sabotage,
    SystemType.Decontamination,
  ],
  [
    SystemType.Electrical,
    SystemType.Medbay,
    SystemType.Security,
    SystemType.Communications,
    SystemType.Doors,
    SystemType.Sabotage,
    SystemType.Decontamination,
    SystemType.Laboratory,
    SystemType.Decontamination2,
  ],
];

export class Component {
  public old?: Component = undefined;
  public Data: ComponentData | null = null;
  public length: number = -1;
  public netID: bigint = -1n;
  public flag: number = -1;
  //if old, not spawn!

  constructor(private spawnId: bigint, public index: number) {}

  private readData(pb: PolusBuffer, room: Room) {
    const spawn = !(this.old && this.old.Data);
    switch (Number(this.spawnId)) {
      case ObjectType.HeadQuarters:
      case ObjectType.AprilShipStatus:
      case ObjectType.PlanetMap:
      case ObjectType.ShipStatus:
        const mapOrder =
          MAP_SYSTEM_ORDER[room.settings.Map === 7 ? 0 : room.settings.Map];
        if (!(<ShipStatus>this.Data)) {
          this.Data = {
            type: "ShipStatus",
            systems: [],
          };
        }
        if (spawn) {
          for (let k of mapOrder) {
            if (
              k == SystemType.Decontamination ||
              k == SystemType.Decontamination2
            ) {
              continue;
            }
            const handler = SYSTEM_HANDLER.get(k);
            (<ShipStatus>this.Data).systems[k] = {
              system: k,
              data: handler?.read(pb, room, true),
            };
            // console.log(`read ship system ${k}`, JSON.stringify((<ShipStatus>this.Data).systems[k]))
          }
        } else {
          const mask = Number(pb.readVarInt());
          (<ShipStatus>this.Data).mask = mask;
          for (let k of mapOrder) {
            if ((mask & (1 << k)) != 0) {
              const handler = SYSTEM_HANDLER.get(k);
              (<ShipStatus>this.Data).systems[k] = {
                system: k,
                data: handler?.read(pb, room, false),
              };
            }
          }
        }
        break;
      case ObjectType.Player:
        if (this.index == 0) {
          this.Data = {
            type: "PlayerControl",
            new: spawn ? pb.readBoolean() : false,
            id: pb.readU8(),
          };
        }
        if (this.index == 2) {
          this.Data = {
            type: "CustomTransformData",
            lastSequenceID: pb.readU16(),
            targetPosition: new Vector2().parse(pb),
            targetVelocity: new Vector2().parse(pb),
          };
        }
        break;
      case ObjectType.GameData:
        // console.log(pb)
        if (this.index === 0) {
          let PlayerCount = spawn ? pb.readVarInt() : pb.readU8();
          let PlayerData: GameDataPlayerData;
          const gd: GameDataPlayerData[] = [];
          for (let i = 0; i < PlayerCount; i++) {
            PlayerData = {
              type: "GameDataPlayerData",
              PlayerID: pb.readU8(),
              PlayerName: pb.readString(),
              Color: pb.readVarInt(),
              HatID: pb.readVarInt(),
              PetID: pb.readVarInt(),
              SkinID: pb.readVarInt(),
              Flags: { Dead: false, Impostor: false, Disconnected: false },
              Tasks: [],
            };
            let FlagsBitfield = pb.readU8();
            PlayerData.Flags = {
              Disconnected: (FlagsBitfield & 0b00000001) != 0,
              Impostor: (FlagsBitfield & 0b00000010) != 0,
              Dead: (FlagsBitfield & 0b00000100) != 0,
            };
            PlayerData.Tasks = Array(pb.readU8());
            for (let i2 = 0; i2 < PlayerData.Tasks.length; i2++) {
              PlayerData.Tasks[i2] = {
                TaskID: pb.readVarInt(),
                TaskCompleted: pb.readBoolean(),
              };
            }
            // console.log(PlayerData)
            gd.push(PlayerData);
          }
          this.Data = {
            type: "GameData",
            players: gd,
          };
        }
        if (this.index === 1) {
          let o: PlayerVoteBanSystem = {
            type: "PlayerVoteBanSystem",
            Players: new Map(),
          };
          let ArrLen = pb.readU8();
          for (let i = 0; i < ArrLen; i++) {
            let ClientID = pb.read32();
            if (ClientID == 0x00) break;
            if (!o.Players.has(ClientID)) {
              o.Players.set(ClientID, [
                pb.readVarInt(),
                pb.readVarInt(),
                pb.readVarInt(),
              ]);
            }
          }
          this.Data = o;
        }
        break;
      case ObjectType.MeetingHud:
        const mh: MeetingHud = {
          type: "MeetingHud",
          players: [],
        };
        let mask;

        if (!spawn) {
          mask = Number(pb.readVarInt());
        }

        for (let i = 0; i < this.length; i++) {
          // TODO: mask is sometimes also undefined
          //       even in non-spawn messages.
          // @ts-ignore
          const masked = mask & (1 << i);

          if (spawn || masked) {
            mh.players[i] = StateByte.parse(pb.readU8());
          }
        }
        this.Data = mh;
        break;
      case ObjectType.LobbyBehavior:
        //empty!
        break;
    }
  }

  private writeData(room: Room): PolusBuffer {
    const spawn = !(this.old && this.old.Data);
    const pb = new PolusBuffer();
    switch (Number(this.spawnId)) {
      case ObjectType.HeadQuarters:
      case ObjectType.AprilShipStatus:
      case ObjectType.PlanetMap:
      case ObjectType.ShipStatus:
        const mapOrder =
          MAP_SYSTEM_ORDER[room.settings.Map === 7 ? 0 : room.settings.Map];
        if (spawn) {
          for (let k of mapOrder) {
            if (
              k == SystemType.Decontamination ||
              k == SystemType.Decontamination2
            ) {
              continue;
            }
            let data = (<ShipStatus>this.Data).systems[k];
            const handler = SYSTEM_HANDLER.get(data.system);
            handler?.write(data.data, pb, room, true);
            console.log(`write ship system ${k}`, pb.buf.toString("hex"));
          }
        } else {
          let mask = (<ShipStatus>this.Data).mask;
          let buffers: PolusBuffer[] = [new PolusBuffer()];

          for (let k of mapOrder) {
            if ((Number(mask) & (1 << k)) != 0) {
              let data = (<ShipStatus>this.Data).systems[k];
              let buf = new PolusBuffer();
              const handler = SYSTEM_HANDLER.get(k);
              const oldComponent = this.old;

              if (!oldComponent) {
                throw new Error(
                  "Tried to do something with an undefined old component"
                );
              }

              handler?.write(
                data.data,
                buf,
                room,
                false,
                (<ShipStatus>oldComponent.Data).systems[k].data
              );
              buffers.push(buf);
            }
          }

          buffers[0].writeVarInt(BigInt(mask));
          pb.writeBytes(PolusBuffer.concat(...buffers));
        }
        break;
      case ObjectType.Player:
        if (this.index == 0) {
          let control = <PlayerControl>this.Data;
          if (!(this.old && this.old.Data)) {
            pb.writeBoolean(control.new);
          }
          pb.writeU8(control.id);
        } else if (this.index == 2) {
          let data = <CustomTransformData>this.Data;
          pb.writeU16(data.lastSequenceID);
          pb.writeBytes(data.targetPosition.serialize());
          pb.writeBytes(data.targetVelocity.serialize());
        }
        break;
      case ObjectType.GameData:
        if (this.index == 0) {
          pb.writeVarInt(
            BigInt((<GameData>(<unknown>this.Data)).players.length)
          );
          (<GameData>(<unknown>this.Data)).players.forEach((player) => {
            pb.writeU8(player.PlayerID);
            pb.writeString(player.PlayerName);
            pb.writeVarInt(player.Color);
            pb.writeVarInt(player.HatID);
            pb.writeVarInt(player.PetID);
            pb.writeVarInt(player.SkinID);
            let flags = 0;
            if (player.Flags.Disconnected) flags += 0b00000001;
            if (player.Flags.Impostor) flags += 0b00000010;
            if (player.Flags.Dead) flags += 0b00000100;
            pb.writeU8(flags);
            pb.writeU8(player.Tasks.length);
            for (let i = 0; i < player.Tasks.length; i++) {
              const task = player.Tasks[i];
              pb.writeVarInt(task.TaskID);
              pb.writeBoolean(task.TaskCompleted);
            }
          });
        }
        if (this.index == 1) {
          //@ts-ignore
          let playersarr = [...this.Data.Players.entries()];
          pb.writeU8(playersarr.length);
          playersarr.forEach((player) => {
            pb.write32(player[0]);
            pb.writeVarInt(player[1][0]);
            pb.writeVarInt(player[1][1]);
            pb.writeVarInt(player[1][2]);
          });
        }
        break;
      case ObjectType.MeetingHud:
        let dirtyBits = this.calculateDirtyBits();

        if (!spawn) {
          pb.writeVarInt(BigInt(dirtyBits));
        }

        for (let i = 0; i < (<MeetingHud>this.Data).players.length; i++) {
          if (spawn || (Number(dirtyBits) & (1 << i)) != 0) {
            pb.writeU8(
              StateByte.serialize(
                <StateByteInterface>(<MeetingHud>this.Data).players[i]
              )
            );
          }
        }
        break;
      case ObjectType.LobbyBehavior:
        //still empty :rolling_eyes:
        break;
    }
    return pb;
  }

  private calculateDirtyBits(): number {
    if (!(this.old && this.old.Data)) {
      return 0xffffffff;
    } else {
      switch (Number(this.spawnId)) {
        case ObjectType.HeadQuarters:
        case ObjectType.AprilShipStatus:
        case ObjectType.PlanetMap:
        case ObjectType.ShipStatus:
          throw new Error(
            "calculateDirtyBits called while this.spawnID is typeof ObjectType.ShipStatus (or similar) this in unintended behavior, as for efficiency dirtybits are calculated inside the serializer"
          );
        case ObjectType.Player:
          throw new Error(
            "calculateDirtyBits called while this.spawnID is typeof ObjectType.Player"
          );
        case ObjectType.GameData:
          throw new Error(
            "calculateDirtyBits called while this.spawnID is typeof ObjectType.GameData"
          );
        case ObjectType.MeetingHud:
          var num = 0;
          for (let i = 0; i < (<MeetingHud>this.Data).players.length; i++) {
            if ((<MeetingHud>this.Data).players[i]) {
              num |= 1 << i;
            }
          }
          return num;
        default:
          return 0;
      }
    }
  }

  parse(pb: PolusBuffer, room: Room): Component {
    let newcomp = new Component(this.spawnId, this.index);
    if (this.old) {
      // console.log("WOWEE", this.old)
      newcomp.netID = this.netID;
      newcomp.length = this.length;
      newcomp.flag = this.flag;
    } else {
      newcomp.netID = pb.readVarInt();
      newcomp.length = pb.readU16();
      newcomp.flag = pb.readU8();
    }
    newcomp.old = this;
    newcomp.Data = this.Data;
    newcomp.readData(pb, room);
    return newcomp;
  }

  serialize(room: Room): PolusBuffer {
    if (!room) {
      console.log("Component serialize missing room:", room);
    }
    if (this.old && this.old.Data) {
      return this.writeData(room);
    } else {
      let pbmas = new PolusBuffer();
      pbmas.writeVarInt(this.netID);
      let pbsub = this.writeData(room);
      pbmas.writeU16(pbsub.length);
      pbmas.writeU8(this.flag);
      pbmas.writeBytes(pbsub);
      return pbmas;
    }
  }
}
