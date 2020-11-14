import PolusBuffer from '../../../../util/PolusBuffer'

export interface SetInfectedPacket {
	InfectedCount?: bigint,
	InfectedPlayerIDs: bigint[]
}

export default class SetInfected {

	parse(packet: PolusBuffer): SetInfectedPacket {
		let returnData: SetInfectedPacket = {
			InfectedCount: packet.readVarInt(),
			InfectedPlayerIDs: []
		};
		for (let i = 0; i < returnData.InfectedCount; i++) {
			returnData.InfectedPlayerIDs[i] = packet.readVarInt();
		}
		return returnData;
	}
	serialize(packet: SetInfectedPacket): PolusBuffer {
		let buf = new PolusBuffer();
		buf.writeVarInt(BigInt(packet.InfectedPlayerIDs.length));
		for (let i = 0; i < packet.InfectedPlayerIDs.length; i++) {
			buf.writeVarInt(packet.InfectedPlayerIDs[i]);
		}
		return buf;
	};
};