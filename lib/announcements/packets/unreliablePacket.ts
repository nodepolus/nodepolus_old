
import PolusBuffer from '../../util/polusBuffer'
import { CacheAnnouncement, CacheAnnouncementPacket } from './subpackets/cacheAnnouncement';
import { AnnouncementData, AnnouncementDataPacket } from "./subpackets/announcementData";
import { FreeWeekend, FreeWeekendPacket } from './subpackets/freeWeekend';
import { PacketHandler } from '../../packets/packet';
import { Room } from '../../util/room';

export type UnreliablePacketData = CacheAnnouncementPacket | AnnouncementDataPacket | FreeWeekendPacket;

export interface UnreliablePacket {
	Packets: UnreliablePacketData[]
}

export const Unreliable: PacketHandler<UnreliablePacket> = {
	parse(packet: PolusBuffer, room: Room): UnreliablePacket {
		const packets = [];
		while (packet.dataRemaining().length != 0) {
      // Force read length first
			packet.readU16();
			const type = packet.readU8();
			// const data = packet.readBytes(length);
			switch (type) {
				case 0x00:
                    packets.push(CacheAnnouncement.parse(packet, room));
					break;
				case 0x01:
                    packets.push(AnnouncementData.parse(packet, room))
					break;
				case 0x02:
                    packets.push(FreeWeekend.parse(packet, room))
					break;
				default:
					break;
			}
		}
		return { Packets: packets };
  },

	serialize(packet: UnreliablePacket):PolusBuffer {
		var buf = new PolusBuffer();
		// console.log(packet)
		packet.Packets.forEach(subpacket => {
			// @ts-ignore
			let serialized:PolusBuffer = this[subpacket.type + "PacketHandler"].serialize(subpacket)
			let type: number;
			switch(subpacket.type) {
				case 'CacheAnnouncement':
					type = 0x00;
					break;
				case 'AnnouncementData':
					type = 0x01;
					break;
				case 'FreeWeekend':
					type = 0x02;
					break;
			}
			buf.writeU16(serialized.length);
			buf.writeU8(type);
			buf.writeBytes(serialized);
		})
		return buf;
	}
}
