import { AsyncEventEmitter, Events } from "./asyncEventEmitter";

type TaskEvents = Events & {
  completed: () => Promise<void>;
  uncompleted: () => Promise<void>;
};

export class Task extends AsyncEventEmitter<TaskEvents> {
  complete: boolean = false;
  ID: number;

  constructor(ID: number) {
    super();
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
