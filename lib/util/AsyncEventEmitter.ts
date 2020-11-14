export default class AsyncEventEmitter {
	emitterMap = new Map<string, Function[]>()
	on(evt:string, fun:Function) {
		if(this.emitterMap.has(evt)) {
			let fnarr = this.emitterMap.get(evt);
			fnarr.push(fun)
			this.emitterMap.set(evt, fnarr)
		} else {
			this.emitterMap.set(evt, [fun])
		}
	}
	emit(evt:string, ...data:any) {
		return new Promise((resolve, reject) => {
			if (this.emitterMap.has(evt)){
				Promise.allSettled(this.emitterMap.get(evt).map(fn => fn(...data))).then(resolve).catch(reject)
			} else {
				resolve()
			}
		})
	}
	off(evt:string, fun:Function) {
		if (this.emitterMap.has(evt)) {
			let fnarr = this.emitterMap.get(evt);
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
		let newfun = (...params:any) => {
			gthis.off(evt, newfun)
			fun(...params)
		}
		this.on(evt, newfun)
	}
}