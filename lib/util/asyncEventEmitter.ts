type EventName = string;
type ExtractName<EventMap> = Extract<keyof EventMap, EventName>;

export interface Events {
  [eventName: string]: (...args: unknown[]) => Promise<void>;
}

export class AsyncEventEmitter<EventMap extends Events> {
  emitterMap = new Map<keyof EventMap, Function[]>();

  on<Name extends ExtractName<EventMap>>(
    event: Name,
    listener: EventMap[Name]
  ) {
    if (this.emitterMap.has(event)) {
      let fnarr = this.emitterMap.get(event);
      if (!fnarr) fnarr = [];
      fnarr.push(listener);
      this.emitterMap.set(event, fnarr);
    } else {
      this.emitterMap.set(event, [listener]);
    }
  }

  public async emit<
    Name extends ExtractName<EventMap>,
    Params extends Parameters<EventMap[Name]>,
    MaybeParams = Params extends undefined ? never : Params
  >(event: Name, ...data: MaybeParams[]) {
    let functions = this.emitterMap.get(event) || [];
    for (let i = 0; i < functions.length; i++) {
      const fn = functions[i];
      await fn(...data);
    }
    // console.log("Done", evt)
  }

  off<Name extends ExtractName<EventMap>>(event: Name, fn: EventMap[Name]) {
    if (this.emitterMap.has(event)) {
      let fnarr = this.emitterMap.get(event);
      if (!fnarr) return;
      let idx = fnarr.indexOf(fn);
      if (idx != -1) {
        fnarr.splice(idx, 1);
      }
      this.emitterMap.set(event, fnarr);
    } else {
      throw new Error(
        "attempted to remove an EventListener on an Event that doesn't exist"
      );
    }
  }

  once<Name extends ExtractName<EventMap>>(event: Name, fn: EventMap[Name]) {
    let newfun = async (...params: any) => {
      // @ts-ignore
      this.off(event, newfun);
      await fn(...params);
    };
    // @ts-ignore
    this.on(event, newfun);
  }
}
