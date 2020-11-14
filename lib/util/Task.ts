import AsyncEventEmitter from "./AsyncEventEmitter";

export default class Task extends AsyncEventEmitter {
	public complete: boolean;
	constructor(public ID: number) {
		super()
	}
	private SetCompleteStatus(status: boolean) {
		
	}
	Complete() {
		this.emit("completed")
		this.SetCompleteStatus(true)
	}
	Uncomplete() {
		// prevents truey results from getting through
		if (this.complete === true) {
			this.emit("uncompleted")
			this.complete = false;
		} else {
			this.complete = false;
		}
	}
}