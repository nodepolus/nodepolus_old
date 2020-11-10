import DisconnectReason from '../PacketElements/DisconnectReason'
import PolusBuffer from '../../util/PolusBuffer'
import RoomCode from '../PacketElements/RoomCode'
import Room from '../../util/Room'
import { SubpacketClass } from './subpacket'

export interface RemovePlayerPacket {
  type: 'RemovePlayer',
	RoomCode: string,
	PlayerClientID: bigint,
	HostClientID?: number,
	DisconnectReason: DisconnectReason
}

export const RemovePlayer: SubpacketClass<RemovePlayerPacket> = {
	parse(packet: PolusBuffer, room: Room): RemovePlayerPacket {
		let roomCode = RoomCode.intToString(packet.read32())
		let PlayerClientID = packet.readVarInt()
		let HostClientID;
		if(packet.dataRemaining().length != 1) {
			HostClientID = packet.readU32();
		}
		return {
      type: 'RemovePlayer',
			RoomCode: roomCode,
			PlayerClientID,
			HostClientID,
			DisconnectReason: new DisconnectReason(packet, room)
		};
  },

	serialize(packet: RemovePlayerPacket) {
		var buf = new PolusBuffer(12);
		buf.write32(RoomCode.stringToInt(packet.RoomCode));
		buf.writeVarInt(packet.PlayerClientID);
		if(packet.HostClientID) {
			buf.writeU32(packet.HostClientID);
		}
		buf.writeBytes(packet.DisconnectReason.serialize());
		return buf;
	}
}
