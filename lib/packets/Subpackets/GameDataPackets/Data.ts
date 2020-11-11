import PolusBuffer from '../../../util/PolusBuffer'
import Component from '../../PacketElements/Component'
import Room from '../../../util/Room'
import { GameDataPacketType } from '../GameData'

import { SubpacketClass } from '../'

export interface DataPacket {
  type: GameDataPacketType.Data,
	Component: Component;
}

export const Data: SubpacketClass<DataPacket> = {
	parse(packet: PolusBuffer, room: Room): DataPacket {
		let ComponentNetID = packet.readVarInt();
		let Component = room.GameObjects.map(e => e.Components).flat(1).find(comp => comp.netID == ComponentNetID);
		return {
			type: GameDataPacketType.Data,
			Component: Component.parse(packet)
		};
  },

	serialize(packet: DataPacket): PolusBuffer {
		let {Component} = packet;
		let ComponentNetID = Component.netID;
		let buf = new PolusBuffer();
		buf.writeVarInt(ComponentNetID);
		let serialized = Component.serialize();
		buf.writeBytes(serialized);
		return buf;
	}
}
