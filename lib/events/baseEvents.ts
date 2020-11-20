import { DisconnectReason } from "../packets/packetElements/disconnectReason";

export abstract class BaseEvent {
  timeEmitted: number;
  constructor() {
    this.timeEmitted = Date.now();
  }
}

export abstract class BaseCancelableEvent extends BaseEvent {
  public isCanceled: boolean = false;
  public cancelReason?: DisconnectReason;
  cancel(reason: DisconnectReason) {
    this.isCanceled = true;
    this.cancelReason = reason;
  }
}
