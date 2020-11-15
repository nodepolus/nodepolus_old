import { PacketHandler } from '../../../packets/Packet';
import PolusBuffer from '../../../util/PolusBuffer'

export interface CacheAnnouncementPacket{
    type: "CacheAnnouncement"
}

export const CacheAnnouncement: PacketHandler<CacheAnnouncementPacket> = {
	parse(packet: PolusBuffer): CacheAnnouncementPacket {
		return {
            type: "CacheAnnouncement"
		};
	},

	serialize(packet: CacheAnnouncementPacket): PolusBuffer {
        return new PolusBuffer(0);
	}
}
