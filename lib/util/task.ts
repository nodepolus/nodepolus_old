import AsyncEventEmitter from "./asyncEventEmitter";

export default class Task extends AsyncEventEmitter {
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
