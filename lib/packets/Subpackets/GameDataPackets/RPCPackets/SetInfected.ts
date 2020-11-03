import PolusBuffer from "../../../../util/PolusBuffer";

export interface SetInfectedPacket {
	InfectedCount?: bigint,
	InfectedPlayerIDs: bigint[]
}

export default class SetInfected {

	parse(packet: PolusBuffer): SetInfectedPacket {
		let returnData: SetInfectedPacket;
		returnData.InfectedCount = packet.readVarInt();
		returnData.InfectedPlayerIDs = Array(Number(returnData.InfectedCount))
		for (let i = 0; i < returnData.InfectedPlayerIDs.length; i++) {
			returnData.InfectedPlayerIDs[i] = packet.readVarInt();
		}
		return returnData;
	}
	serialize(packet: SetInfectedPacket): PolusBuffer {
		let buf = new PolusBuffer();
		buf.writeVarInt(packet.InfectedCount ? packet.InfectedCount : BigInt(packet.InfectedPlayerIDs.length));
		for (let i = 0; i < packet.InfectedPlayerIDs.length; i++) {
			buf.writeVarInt(packet.InfectedPlayerIDs[i]);
		}
		return buf;
	};
};