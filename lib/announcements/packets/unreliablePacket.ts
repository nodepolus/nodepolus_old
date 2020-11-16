import PolusBuffer from "../../util/polusBuffer";
import {
  CacheAnnouncement,
  CacheAnnouncementPacket,
} from "./subpackets/cacheAnnouncement";
import {
  AnnouncementData,
  AnnouncementDataPacket,
} from "./subpackets/announcementData";
import { FreeWeekend, FreeWeekendPacket } from "./subpackets/freeWeekend";
import { PacketHandler } from "../../packets/packet";
import { Room } from "../../util/room";

export type UnreliablePacketData =
  | CacheAnnouncementPacket
  | AnnouncementDataPacket
  | FreeWeekendPacket;

export enum UnreliablePacketType {
  CacheAnnouncement = "CacheAnnouncement",
  AnnouncementData = "AnnouncementData",
  FreeWeekend = "FreeWeekend",
}

export interface UnreliablePacket {
  Packets: UnreliablePacketData[];
}

const handlers: {
  [x in keyof typeof UnreliablePacketType]: PacketHandler<UnreliablePacketData>;
} = {
  [UnreliablePacketType.CacheAnnouncement]: CacheAnnouncement,
  [UnreliablePacketType.AnnouncementData]: AnnouncementData,
  [UnreliablePacketType.FreeWeekend]: FreeWeekend,
};

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
          packets.push(AnnouncementData.parse(packet, room));
          break;
        case 0x02:
          packets.push(FreeWeekend.parse(packet, room));
          break;
        default:
          break;
      }
    }
    return { Packets: packets };
  },

  serialize(packet: UnreliablePacket, room: Room): PolusBuffer {
    const buf = new PolusBuffer();
    packet.Packets.forEach((subpacket) => {
      const handler = handlers[subpacket.type];
      if (!handler)
        throw new Error(
          "Could not find packet handler for unreliable packet type: " +
            subpacket.type
        );

      const serialized = handler.serialize(subpacket, room);
      let type: number;
      switch (subpacket.type) {
        case "CacheAnnouncement":
          type = 0x00;
          break;
        case "AnnouncementData":
          type = 0x01;
          break;
        case "FreeWeekend":
          type = 0x02;
          break;
      }
      buf.writeU16(serialized.length);
      buf.writeU8(type);
      buf.writeBytes(serialized);
    });
    return buf;
  },
};
