import { RoomCode } from "../packetElements/roomCode";
import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";

export interface PlayerJoinedGamePacket {
  type: "PlayerJoinedGame";
  RoomCode: string;
  PlayerClientID: number;
  HostClientID: number;
}

export const PlayerJoinedGame: PacketHandler<PlayerJoinedGamePacket> = {
  parse(packet: PolusBuffer): PlayerJoinedGamePacket {
    const playerJoinedGamePacket: PlayerJoinedGamePacket = {
      type: "PlayerJoinedGame",
      RoomCode: RoomCode.decode(packet.read32()),
      PlayerClientID: packet.readU32(),
      HostClientID: packet.readU32(),
    };
    return playerJoinedGamePacket;
  },

  serialize(packet: PlayerJoinedGamePacket): PolusBuffer {
    const buf = new PolusBuffer(12);
    buf.write32(RoomCode.encode(packet.RoomCode));
    buf.writeU32(packet.PlayerClientID);
    buf.writeU32(packet.HostClientID);
    return buf;
  },
};
