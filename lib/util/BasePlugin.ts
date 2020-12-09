import { Server } from "../server";
import { EventManager } from "./EventManager";

export class BasePlugin {
    public _server?: Server
    public _eventManager?: EventManager

    public load(server: Server, eventManager: EventManager) {
        this._server = server
        this._eventManager = eventManager
    }
}