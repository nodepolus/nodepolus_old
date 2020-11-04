import PolusBuffer from "../util/PolusBuffer.js";
import DisconnectReason from "./PacketElements/DisconnectReason.js";
import Room from "../util/Room.js";

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