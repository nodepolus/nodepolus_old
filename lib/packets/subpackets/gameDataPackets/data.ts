import PolusBuffer from '../../../util/polusBuffer'
import Component from '../../packetElements/component'
import { Room } from '../../../util/room'
import { GameDataPacketType } from '../gameData'
import { PacketHandler } from '../../packet'

export interface DataPacket {
  type: GameDataPacketType.Data,
	Component: Component;
}

export const Data: PacketHandler<DataPacket> = {
	parse(packet: PolusBuffer, room: Room): DataPacket {
		let ComponentNetID = packet.readVarInt();
    let component = room.GameObjects.map(e => e.Components).flat(1).find(comp => comp.netID == ComponentNetID);

    if (!component) {
      throw new Error('Could not find matching GameObject for component: ' + ComponentNetID)
    }
    
		return {
			type: GameDataPacketType.Data,
			Component: component.parse(packet, room)
		};
  },

	serialize(packet: DataPacket, room: Room): PolusBuffer {
		let {Component} = packet;
		let ComponentNetID = Component.netID;
		let buf = new PolusBuffer();
		buf.writeVarInt(ComponentNetID);
		let serialized = Component.serialize(room);
		buf.writeBytes(serialized);
		return buf;
	}
}
