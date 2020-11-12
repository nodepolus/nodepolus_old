import PolusBuffer from '../../util/PolusBuffer";
import { Room } from '../../util/Room";

interface System{
    parse(pb: PolusBuffer, room: Room): void;
    serialize(pb: PolusBuffer, room: Room): void;
}

export class DoorSystem implements System{
    public Doors: []
	parse(pb: PolusBuffer, room: Room): void {
		throw new Error("Method not implemented.");
	}
	serialize(pb: PolusBuffer, room: Room): void {
		throw new Error("Method not implemented.");
	}

}