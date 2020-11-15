import PolusBuffer from "../../../../util/polusBuffer";
import { Room } from "../../../../util/room";
import { PacketHandler } from "../../../packet";
import RoomSettings from "../../../packetElements/roomSettings";

export interface SyncSettingsPacket {
  RoomSettings: RoomSettings;
}

export const SyncSettings: PacketHandler<SyncSettingsPacket> = {
  parse(packet: PolusBuffer, room: Room): SyncSettingsPacket {
    let rs = new RoomSettings(room);
    rs.parse(packet);
    return { RoomSettings: rs };
  },

  serialize(packet: SyncSettingsPacket): PolusBuffer {
    return packet.RoomSettings.serialize();
  },
};
