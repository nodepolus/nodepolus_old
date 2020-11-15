import Vector2 from "../packets/packetElements/vector2";
import {
  PlayerColor,
  PlayerSkin,
  PlayerHat,
  PlayerPet,
  Vent,
} from "../data/enums/playerEnums";
import Task from "./task";
import Connection from "./connection";
import { IGameObject } from "./gameObject";
import AsyncEventEmitter from "./asyncEventEmitter";
import { GameDataPlayerData } from "../packets/packetElements/componentTypes";

enum DeathType {
  Murdered = 0x00,
  Exiled = 0x01,
  Sabotage = 0x02,
  Other = 0x03,
}

export class Player extends AsyncEventEmitter {
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
  get position(): Vector2 {
    // TODO: do pos handling
    return new Vector2(0, 0);
  }
  get acceleration(): Vector2 {
    // TODO: do accel handling
    return new Vector2(0, 0);
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

  setID(playerID: number) {
    this.int_ID = playerID;
    //TODO: Emit event 'IDChanged':IDChangedEvent
    //TODO: Send ID change packet
  }

  setName(playerName: string) {
    this.int_name = playerName;
    //TODO: Emit event 'NameChanged':NameChangedEvent
    //TODO: Send name change packet
  }

  setColor(playerColor: PlayerColor) {
    this.int_color = playerColor;
    //TODO: Emit event 'ColorChanged':ColorChangedEvent
    //TODO: Send color change packet
  }

  setHat(playerHat: PlayerHat) {
    this.int_hat = playerHat;
    //TODO: Emit event 'HatChanged':HatChangedEvent
    //TODO: Send hat change packet
  }

  setPet(playerPet: PlayerPet) {
    this.int_pet = playerPet;
    //TODO: Emit event 'PetChanged':PetChangedEvent
    //TODO: Send pet change packet
  }

  setSkin(playerSkin: PlayerSkin) {
    this.int_skin = playerSkin;
    //TOOD: Emit event 'SkinChanged':SkinChangedEvent
    //TODO: Send skin change packet
  }

  setTasks(playerTasks: Task[]) {
    this.int_tasks = playerTasks;
    //TODO: Emit event 'TasksUpdated':TasksUpdatedEvent
    //TODO: Send task change packet
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
    this.int_isImpostor = true;
    //TODO: Emit event 'impostor':null
    //TODO: Send RPCSetInfected packet
  }

  setCrewmate() {
    this.int_isImpostor = false;
    //TODO: Emit event 'crewmate':null
    //TODO Figure out what packet to send when a player is set to Crewmate.
  }

  murder(player: Player) {
    player.int_isAlive = false;
    //TODO Emit event 'murders':MurderEvent
    //TODO player emit event 'murdered':MurderedEvent
    //TODO player emit event 'died':null
    //TODO send rpc murder packet
  }
}
