import { RoomCode } from "../packetElements/roomCode";
import { PolusBuffer } from "../../util/polusBuffer";
import { PacketHandler } from "../packet";

export interface RoomListing {
  IP: string;
  Port: number;
  RoomCode: string;
  RoomName: string;
  PlayerCount: number;
  Age: number;
  MapID: number;
  ImpostorCount: number;
  MaxPlayers: number;
}

export interface GameSearchResultsPacket {
  type: "GameSearchResults";
  RoomList: RoomListing[];
  SkeldGameCount?: number;
  MiraHQGameCount?: number;
  PolusGameCount?: number;
}

export const GameSearchResults: PacketHandler<GameSearchResultsPacket> = {
  parse(packet: PolusBuffer): GameSearchResultsPacket {
    let searchPacket: GameSearchResultsPacket = {
      type: "GameSearchResults",
      RoomList: new Array<RoomListing>(),
    };

    while (packet.dataRemaining().length != 0) {
      const length = packet.readU16();
      const type = packet.readU8();
      const data = packet.readBytes(length);
      switch (type) {
        case 0x00:
          while (data.dataRemaining().length != 0) {
            //skip 3 bytes
            data.cursor += 3;
            searchPacket.RoomList.push({
              IP: [
                data.readU8(),
                data.readU8(),
                data.readU8(),
                data.readU8(),
              ].join("."),
              Port: data.readU16(),
              RoomCode: RoomCode.decode(data.read32()),
              RoomName: data.readString(),
              PlayerCount: data.readU8(),
              Age: data.readVarInt(),
              MapID: data.readU8(),
              ImpostorCount: data.readU8(),
              MaxPlayers: data.readU8(),
            });
          }
          break;
        case 0x01:
          searchPacket.SkeldGameCount = data.readU32();
          searchPacket.MiraHQGameCount = data.readU32();
          searchPacket.PolusGameCount = data.readU32();
          break;
      }
    }
    return searchPacket;
  },

  serialize(packet: GameSearchResultsPacket): PolusBuffer {
    let GameCountBuffer: PolusBuffer | null = null;
    if (
      packet.SkeldGameCount != undefined &&
      packet.MiraHQGameCount != undefined &&
      packet.PolusGameCount != undefined
    ) {
      GameCountBuffer = new PolusBuffer(15);
      GameCountBuffer.writeU16(12);
      GameCountBuffer.writeU8(1);
      GameCountBuffer.writeU32(packet.SkeldGameCount);
      GameCountBuffer.writeU32(packet.MiraHQGameCount);
      GameCountBuffer.writeU32(packet.PolusGameCount);
    }
    let GameBuffers = PolusBuffer.concat(
      ...packet.RoomList.map((singleRoom) => {
        const sizeBuffer = new PolusBuffer(3);
        const roomBuffer = new PolusBuffer();
        const roomIP = singleRoom.IP.split(".").map((e) => parseInt(e));
        roomIP.forEach((int) => {
          roomBuffer.writeU8(int);
        });
        roomBuffer.writeU16(singleRoom.Port);
        roomBuffer.write32(RoomCode.encode(singleRoom.RoomCode));
        roomBuffer.writeString(singleRoom.RoomName);
        roomBuffer.writeU8(singleRoom.PlayerCount);
        roomBuffer.writeVarInt(singleRoom.Age);
        roomBuffer.writeU8(singleRoom.MapID);
        roomBuffer.writeU8(singleRoom.ImpostorCount);
        roomBuffer.writeU8(singleRoom.MaxPlayers);
        sizeBuffer.writeU16(roomBuffer.length);
        sizeBuffer.writeU8(0x00);
        return PolusBuffer.concat(sizeBuffer, roomBuffer);
      })
    );
    const GlobalGameBuffersSize = new PolusBuffer(3);
    GlobalGameBuffersSize.writeU16(GameBuffers.length);
    GlobalGameBuffersSize.writeU8(0x00);
    GameBuffers = PolusBuffer.concat(GlobalGameBuffersSize, GameBuffers);
    if (GameCountBuffer) {
      return PolusBuffer.concat(GameCountBuffer, GameBuffers);
    } else {
      return GameBuffers;
    }
  },
};
