import Connection from "../util/connection";
import { BaseEvent } from './baseEvents'


export default class DisconnectionEvent extends BaseEvent {
	constructor(public connection: Connection) { super() }
}