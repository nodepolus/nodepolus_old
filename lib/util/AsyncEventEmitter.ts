export default class AsyncEventEmitter {
	emitterMap = new Map<string, Function[]>()
	on(evt:string, fun:Function) {
		if(this.emitterMap.has(evt)) {
      let fnarr = this.emitterMap.get(evt);
      if (!fnarr) fnarr = []
			fnarr.push(fun)
			this.emitterMap.set(evt, fnarr)
		} else {
			this.emitterMap.set(evt, [fun])
		}
	}
	public async emit(evt:string, ...data:any) {
		let functions = (this.emitterMap.get(evt)||[])
		for (let i = 0; i < functions.length; i++) {
			const fn = functions[i];
			await fn(...data);
		}
		// console.log("Done", evt)
	}
	off(evt:string, fun:Function) {
		if (this.emitterMap.has(evt)) {
      let fnarr = this.emitterMap.get(evt);
      if (!fnarr) return
			let idx = fnarr.indexOf(fun)
			if(idx != -1) {
				fnarr.splice(idx, 1)
			}
			this.emitterMap.set(evt, fnarr)
		} else {
			throw new Error("attempted to remove an EventListener on an Event that doesn't exist")
		}
	}
	once(evt:string, fun:Function) {
		let gthis = this;
		let newfun = async (...params:any) => {
			gthis.off(evt, newfun)
			await fun(...params)
		}
		this.on(evt, newfun)
	}
}