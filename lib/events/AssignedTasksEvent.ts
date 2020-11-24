import { BaseEvent } from "./baseEvents";
import { Task } from "../util/task";

export class AssignedTasksEvent extends BaseEvent {
  constructor(public tasks: Task[]) {
    super();
  }
}
