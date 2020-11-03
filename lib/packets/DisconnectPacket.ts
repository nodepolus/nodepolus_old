import PolusBuffer from "../util/PolusBuffer";
import DisconnectReason from "./PacketElements/DisconnectReason";
import Room from "../util/Room";

export interface DisconnectPacket {
	DisconnectReason: DisconnectReason
}

class Disconnect {
	constructor(public room: Room) {}
	parse(packet: PolusBuffer): DisconnectPacket {
		return {DisconnectReason: new DisconnectReason(packet, this.room)};
	}
	serialize(packet: DisconnectPacket): PolusBuffer {
		return packet.DisconnectReason.serialize()
	}
}

export default Disconnect;