import { Vector2 } from "../packets/packetElements/vector";
import {
  PlayerColor,
  PlayerSkin,
  PlayerHat,
  PlayerPet,
  Vent,
} from "../data/enums/playerEnums";
import { Task } from "./task";
import { Connection } from "./connection";
import { IGameObject } from "./gameObject";
import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import { GameDataPlayerData } from "../packets/packetElements/componentTypes";
import { RPCPacketType } from "../packets/subpackets/gameDataPackets/rpc";
import { ObjectType } from "../packets/subpackets/gameDataPackets/spawn";

enum DeathType {
  Murdered = 0x00,
  Exiled = 0x01,
  Sabotage = 0x02,
  Other = 0x03,
}

type PlayerEvents = Events & {};

export class Player extends AsyncEventEmitter<PlayerEvents> {
  private int_ID?: number;
  get ID(): number | undefined {
    return this.int_ID;
  }
  connection?: Connection;
  get gameObjects(): IGameObject[] {
    if (!this.connection) return [];
    return this.connection.room.GameObjects.filter(
      (GO) => GO.ClientID == BigInt(this.connection?.ID)
    );
  }
  private int_position: Vector2 = new Vector2(0,0);
  private int_velocity: Vector2 = new Vector2(0,0);
  private positionSetTime: number|undefined;
  get rawPosition(): Vector2 {
    return this.int_position;
  }
  get position(): Vector2 {
    if(this.positionSetTime == undefined) {
      return this.int_position
    }
    let c = new Vector2(this.int_position.x, this.int_position.y)
    c.x += this.int_velocity.x * ((Date.now() - this.positionSetTime) / 1000);
    c.y += this.int_velocity.y * ((Date.now() - this.positionSetTime) / 1000);
    return c;
  }
  private int_color: PlayerColor;
  get color(): PlayerColor {
    return this.int_color;
  }
  private int_skin: PlayerSkin;
  get skin(): PlayerSkin {
    return this.int_skin;
  }
  private int_hat: PlayerHat;
  get hat(): PlayerHat {
    return this.int_hat;
  }
  private int_pet: PlayerPet;
  get pet(): PlayerPet {
    return this.int_pet;
  }
  private int_tasks: Task[];
  get tasks(): Task[] {
    return this.int_tasks;
  }
  private int_isAlive: boolean;
  get isAlive(): boolean {
    return this.int_isAlive;
  }
  get votedFor(): Player | undefined {
    return undefined;
  }
  get skippedVote(): boolean {
    return false;
  }
  get calledMeeting(): boolean {
    return false;
  }
  get isScanning(): boolean {
    return false;
  }
  private int_isImpostor: boolean;
  get isImpostor(): boolean {
    return this.int_isImpostor;
  }
  private int_vent?: Vent;
  get vent(): Vent | undefined {
    return this.int_vent;
  }
  private int_deathType?: DeathType;
  get isExiled(): boolean {
    return this.int_deathType == DeathType.Exiled;
  }
  get isMurdered(): boolean {
    return this.int_deathType == DeathType.Murdered;
  }
  private int_scene?: string;
  get scene(): string | undefined {
    return this.int_scene;
  }
  private int_name: string;
  get name(): string {
    return this.int_name;
  }
  constructor(playerData: GameDataPlayerData) {
    super();
    this.int_ID = playerData.PlayerID;
    this.int_color = Number(playerData.Color);
    this.int_hat = Number(playerData.HatID);
    this.int_isAlive = !playerData.Flags.Dead;
    this.int_isImpostor = playerData.Flags.Impostor;
    this.int_name = playerData.PlayerName;
    this.int_pet = Number(playerData.PetID);
    this.int_skin = Number(playerData.SkinID);
    this.int_tasks = playerData.Tasks.map((taskData) => {
      let t = new Task(Number(taskData.TaskID));
      if (taskData.TaskCompleted) {
        t.Complete();
      } else {
        t.Uncomplete();
      }
      return t;
    });
  }

  enterVent() {}

  sendGameDataSync() {
    if (!this.connection)
      throw new Error("Player has no associated connection");
    let NetID: any = this.connection.room.GameObjects.find(
      (go) => Number(go.SpawnID) == ObjectType.GameData
    );
    if (!NetID) throw new Error("Room does not have a GameData GameObject");
    NetID = NetID.Components[0].netID;
    if (!NetID)
      throw new Error("GameData GameObject's Component[0] Missing NetID");
    let thisPlayerData = {
      PlayerID: this.ID,
      PlayerName: this.name,
      Color: this.color,
      HatID: BigInt(this.hat),
      PetID: BigInt(this.pet),
      SkinID: BigInt(this.skin),
      Flags: {
        Disconnected: false,
        Impostor: this.isImpostor,
        Dead: !this.isAlive,
      },
      Tasks: this.tasks.map((t) => {
        return { TaskID: BigInt(t.ID), TaskCompleted: t.complete };
      }),
    };
    console.log(thisPlayerData)
    this.connection?.room.broadcastToAll({
      type: "GameData",
      RoomCode: this.connection.room.code,
      Packets: [
        {
          type: 2,
          NetID,
          RPCFlag: RPCPacketType.UpdateGameData,
          Packet: {
            PlayerData: [thisPlayerData],
          },
        },
      ],
    });
  }

  setID(playerID: number) {
    this.int_ID = playerID;
    //TODO: Emit event 'IDChanged':IDChangedEvent
    //TODO: Send ID change packet
  }

  setName(playerName: string) {
    if (this.int_name != playerName) {
      this.int_name = playerName;
      //TODO: Emit event 'NameChanged':NameChangedEvent
      this.connection?.room.broadcastToAll({
        type: "GameData",
        RoomCode: this.connection.room.code,
        Packets: [
          {
            type: 2,
            NetID: this.connection.netIDs[0],
            RPCFlag: RPCPacketType.SetName,
            Packet: {
              Name: this.int_name,
            },
          },
        ],
      });
    }
  }

  setColor(playerColor: PlayerColor) {
    if (this.int_color != playerColor) {
      this.int_color = playerColor;
      //TODO: Emit event 'ColorChanged':ColorChangedEvent
      this.connection?.room.broadcastToAll({
        type: "GameData",
        RoomCode: this.connection.room.code,
        Packets: [
          {
            type: 2,
            NetID: this.connection.netIDs[0],
            RPCFlag: RPCPacketType.SetColor,
            Packet: {
              Color: this.int_color,
            },
          },
        ],
      });
    }
  }

  setHat(playerHat: PlayerHat) {
    if (playerHat != this.int_hat) {
      this.int_hat = playerHat;
      //TODO: Emit event 'HatChanged':HatChangedEvent
      this.connection?.room.broadcastToAll({
        type: "GameData",
        RoomCode: this.connection.room.code,
        Packets: [
          {
            type: 2,
            NetID: this.connection.netIDs[0],
            RPCFlag: RPCPacketType.SetHat,
            Packet: {
              Hat: this.int_hat,
            },
          },
        ],
      });
    }
  }

  setPet(playerPet: PlayerPet) {
    if (this.int_pet != playerPet) {
      this.int_pet = playerPet;
      //TODO: Emit event 'PetChanged':PetChangedEvent
      this.connection?.room.broadcastToAll({
        type: "GameData",
        RoomCode: this.connection.room.code,
        Packets: [
          {
            type: 2,
            NetID: this.connection.netIDs[0],
            RPCFlag: RPCPacketType.SetPet,
            Packet: {
              PetID: this.int_pet,
            },
          },
        ],
      });
    }
  }

  setSkin(playerSkin: PlayerSkin) {
    if (playerSkin != this.int_skin) {
      this.int_skin = playerSkin;
      //TOOD: Emit event 'SkinChanged':SkinChangedEvent
      this.connection?.room.broadcastToAll({
        type: "GameData",
        RoomCode: this.connection.room.code,
        Packets: [
          {
            type: 2,
            NetID: this.connection.netIDs[0],
            RPCFlag: RPCPacketType.SetSkin,
            Packet: {
              Skin: this.int_skin,
            },
          },
        ],
      });
    }
  }

  setTasks(playerTasks: Task[], doNotCreateGroup?: boolean) {
    if (this.int_tasks != playerTasks) {
      this.int_tasks = playerTasks;
      //TODO: Emit event 'TasksUpdated':TasksUpdatedEvent
      if (!doNotCreateGroup) {
        this.connection?.room.startPacketGroupBroadcastToAll();
      }
      this.connection?.room.broadcastToAll({
        type: "GameData",
        RoomCode: this.connection.room.code,
        Packets: [
          {
            type: 2,
            NetID: this.connection.netIDs[0],
            RPCFlag: RPCPacketType.SetTasks,
            Packet: {
              Tasks: this.int_tasks.map((task) => task.ID),
            },
          },
        ],
      });
      this.int_tasks.forEach((task, idx) => {
        if (task.complete) {
          this.connection?.room.broadcastToAll({
            type: "GameData",
            RoomCode: this.connection.room.code,
            Packets: [
              {
                type: 2,
                NetID: this.connection.netIDs[0],
                RPCFlag: RPCPacketType.CompleteTask,
                Packet: {
                  TaskIndex: idx,
                },
              },
            ],
          });
        }
      });
      if (!doNotCreateGroup) {
        this.connection?.room.endPacketGroupBroadcastToAll();
      }
    }
  }

  setDead() {
    this.int_isAlive = false;
    //TODO: Emit event 'died':null
    //TODO: Figure out what packet to send when a player dies but is not murdered. GameDataData?
  }

  revive() {
    this.int_isAlive = true;
    //TODO: Emit event 'revived':null
    //TODO: Figure out what packet to send when a player is revived.
  }

  setImpostor() {
    if (!this.int_isImpostor) {
      this.int_isImpostor = true;
      //TODO: Emit event 'impostor':null
      this.connection?.room.broadcastToAll({
        type: "GameData",
        RoomCode: this.connection.room.code,
        Packets: [
          {
            type: 2,
            NetID: this.connection.netIDs[0],
            RPCFlag: RPCPacketType.SetInfected,
            Packet: {
              InfectedPlayerIDs: [BigInt(this.ID)],
            },
          },
        ],
      });
    }
  }

  setCrewmate() {
    this.int_isImpostor = false;
    //TODO: Emit event 'crewmate':null
    //TODO Figure out what packet to send when a player is set to Crewmate.
  }

  murder(player: Player) {
    if (player.connection && player.isAlive) {
      player.int_isAlive = false;
      //TODO Emit event 'murders':MurderEvent
      //TODO player emit event 'murdered':MurderedEvent
      //TODO player emit event 'died':null
      //TODO send RPC murder
    } else {
      throw new Error("Player either has no connection or is already dead.");
    }
  }
}
