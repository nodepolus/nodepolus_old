import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import { Room } from "./room";
import StaticPolusData from "../data/mapData/polus"
import { StaticTaskData, Collider, TaskLength } from "../data/mapData/types";

type TaskEvents = Events & {
  completed: () => Promise<void>;
  uncompleted: () => Promise<void>;
};

export class Task extends AsyncEventEmitter<TaskEvents> {
  complete: boolean = false;
  ID: number;
  collider: Collider;
  isVisual: boolean;
  length: TaskLength;
  name: string;
  stepCount: number;

  constructor(ID: number, public room: Room) {
    super();
    let rawTask = StaticPolusData.tasks.find(task => task.id == ID);
    if(rawTask) {
      this.collider = new Collider(rawTask.collider)
      this.stepCount = rawTask.stepCount
      this.isVisual = rawTask.isVisual
      this.length = rawTask.length
      this.name = rawTask.name
    } else {
      throw new Error("Invalid TaskID " + ID)
    }
    this.ID = ID;
  }

  private SetCompleteStatus(status: boolean) {}
  Complete() {
    this.emit("completed");
    this.SetCompleteStatus(true);
  }
  Uncomplete() {
    // prevents truey results from getting through
    if (this.complete === true) {
      this.emit("uncompleted");
      this.complete = false;
    } else {
      this.complete = false;
    }
  }
}
