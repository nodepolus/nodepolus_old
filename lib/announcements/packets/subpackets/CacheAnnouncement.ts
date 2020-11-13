import PolusBuffer from '../../../util/PolusBuffer'

export interface CacheAnnouncementPacket{
    type: "CacheAnnouncement"
}

export default class CacheAnnouncement {
	parse(packet: PolusBuffer): CacheAnnouncementPacket {
		return {
            type: "CacheAnnouncement"
		};
	}

	serialize(packet: CacheAnnouncementPacket): PolusBuffer {
        return new PolusBuffer(0);
	}
}