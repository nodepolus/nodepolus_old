import PolusBuffer from '../../util/PolusBuffer'
import { SubpacketClass } from '.'

export interface KickPlayerPacket {
  type: 'KickPlayer',
	ClientID: bigint,
	isBanned: boolean
}

export const KickPlayer: SubpacketClass<KickPlayerPacket> = {
	parse(packet: PolusBuffer): KickPlayerPacket {
		return {
      type: 'KickPlayer',
			ClientID: packet.readVarInt(),
			isBanned: packet.readBoolean()
		};
  },

	serialize(packet: KickPlayerPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeVarInt(packet.ClientID);
		buf.writeBoolean(packet.isBanned);
		return buf;
	}
}
