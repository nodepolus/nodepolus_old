import { PacketHandler } from '../../../packets/packet'
import PolusBuffer from '../../../util/polusBuffer'

export interface AnnouncementDataPacket{
    type: "AnnouncementData",
        Id: bigint,
    Text: string
}

export const AnnouncementData: PacketHandler<AnnouncementDataPacket> = {
	parse(packet: PolusBuffer): AnnouncementDataPacket {
		return {
            type: "AnnouncementData",
            Id: packet.readVarInt(),
            Text: packet.readString()
		};
	},

	serialize(packet: AnnouncementDataPacket): PolusBuffer {
        let buf = new PolusBuffer();

        buf.writeVarInt(packet.Id);
        buf.writeString(packet.Text)

        return buf;
	}
}
