import PolusBuffer from '../../../../util/polusBuffer'
import { PacketHandler } from '../../../packet'
import StateByte, { StateByteInterface } from '../../../packetElements/stateByte'	

export interface VotingCompletePacket {
	StatesLength?: bigint;
	States: StateByteInterface[],
	ExiledPlayerPlayerID: number,
	IsTie: boolean
}

export const VotingComplete: PacketHandler<VotingCompletePacket> = {
	parse(packet: PolusBuffer): VotingCompletePacket {
		let data: VotingCompletePacket = {
			StatesLength: packet.readVarInt(),
			States: [],
			ExiledPlayerPlayerID: 0,
			IsTie: false
		};
		data.States = new Array(Number(data.StatesLength));
		for (let i = 0; i < data.States.length; i++) {
			data.States[i] = StateByte.parse(packet.readU8())
		}
		data.ExiledPlayerPlayerID = packet.readU8();
		data.IsTie = packet.readBoolean();
		return data;
  },

	serialize(packet: VotingCompletePacket): PolusBuffer {
		let buf = new PolusBuffer()
		buf.writeVarInt(BigInt(packet.States.length));
		for (var i = 0; i < packet.States.length; i++) {
			buf.writeU8(StateByte.serialize(packet.States[i]));
		}
		buf.writeU8(packet.ExiledPlayerPlayerID);
		buf.writeBoolean(packet.IsTie)
		return buf;
	}
}
