export abstract class Event {}

export abstract class CancelableEvent extends Event {
  abstract cancel(): boolean;
}
