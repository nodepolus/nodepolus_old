import { EventEmitter } from "events";
import PolusBuffer from "./PolusBuffer";

export abstract class PacketHandler extends EventEmitter{
	abstract HandlePacket(buffer: PolusBuffer);
}

export abstract class Event { }

export abstract class CancelableEvent extends Event { 
	abstract cancel():boolean;
}