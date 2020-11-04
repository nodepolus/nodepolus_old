import PolusBuffer from "../../util/PolusBuffer.js";
import Room from "../../util/Room.js";
import DisconnectReason from "../PacketElements/DisconnectReason.js";

export interface JoinGameErrorPacket {
	DisconnectReason: DisconnectReason
}

export default class JoinGameError {
	constructor(private room: Room) {}

	parse(packet: PolusBuffer): JoinGameErrorPacket {
		return {DisconnectReason: new DisconnectReason(packet, this.room)}
	}

	serialize(packet: JoinGameErrorPacket): PolusBuffer {
		return packet.DisconnectReason.serialize();
	}
}