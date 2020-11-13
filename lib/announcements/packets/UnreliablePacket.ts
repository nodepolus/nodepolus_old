
import PolusBuffer from '../../util/PolusBuffer'
import CacheAnnouncement, { CacheAnnouncementPacket } from './subpackets/CacheAnnouncement';
import AnnouncementData, { AnnouncementDataPacket } from "./subpackets/AnnouncementData";
import FreeWeekend, { FreeWeekendPacket } from './subpackets/FreeWeekend';

export type UnreliablePacketData = CacheAnnouncementPacket | AnnouncementDataPacket | FreeWeekendPacket;

export interface UnreliablePacket {
	Packets: UnreliablePacketData[]
}

export default class Unreliable {
    constructor() {}

	CacheAnnouncementPacketHandler = new CacheAnnouncement();
	AnnouncementDataPacketHandler = new AnnouncementData();
	FreeWeekendPacketHandler = new FreeWeekend();

	parse(packet: PolusBuffer): UnreliablePacket {
		const packets = [];
		while (packet.dataRemaining().length != 0) {
			const length = packet.readU16();
			const type = packet.readU8();
			const data = packet.readBytes(length);
			switch (type) {
				case 0x00:
                    packets.push({ type: "CacheAnnouncement", ...this.CacheAnnouncementPacketHandler.parse(packet)});
					break;
				case 0x01:
                    packets.push({ type: "AnnouncementData", ...this.AnnouncementDataPacketHandler.parse(packet)});
					break;
				case 0x02:
                    packets.push({ type: "FreeWeekend", ...this.FreeWeekendPacketHandler.parse(packet)});
					break;
				default:
					break;
			}
		}
		return { Packets: packets };
	}
	serialize(packet: UnreliablePacket):PolusBuffer {
		var buf = new PolusBuffer();
		// console.log(packet)
		packet.Packets.forEach(subpacket => {
			// @ts-ignore
			let serialized:PolusBuffer = this[subpacket.type + "PacketHandler"].serialize(subpacket)
			let type: number;
			// @ts-ignore
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
