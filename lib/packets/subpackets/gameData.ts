import { RoomCode } from "../packetElements/roomCode";
import { PolusBuffer } from "../../util/polusBuffer";
import { Room } from "../../util/room";

import { Data, DataPacket } from "./gameDataPackets/data";
import { RPC, RPCPacket } from "./gameDataPackets/rpc";
import { Spawn } from "./gameDataPackets/spawn";
import { Ready, ReadyPacket } from "./gameDataPackets/ready";
import { SceneChange, SceneChangePacket } from "./gameDataPackets/sceneChange";
import { Despawn, DespawnPacket } from "./gameDataPackets/despawn";
import { IGameObject } from "../../util/gameObject";
import { PacketHandler, PacketHandlerOpts } from "../packet";

export type GameDataSubtype =
  | DataPacket
  | RPCPacket
  | IGameObject
  | ReadyPacket
  | SceneChangePacket
  | DespawnPacket;

export interface GameDataPacket {
  type: "GameData";
  RoomCode: string;
  RecipientClientID?: bigint;
  Packets: GameDataSubtype[];
}

export enum GameDataPacketType {
  Data = 0x01,
  RPC = 0x02,
  Spawn = 0x04,
  Despawn = 0x05,
  SceneChange = 0x06,
  Ready = 0x07,
}

const handlers: {
  [type: number]: PacketHandler<GameDataSubtype>;
} = {
  [GameDataPacketType.Data]: Data,
  [GameDataPacketType.RPC]: RPC,
  [GameDataPacketType.Spawn]: Spawn,
  [GameDataPacketType.Despawn]: Despawn,
  [GameDataPacketType.SceneChange]: SceneChange,
  [GameDataPacketType.Ready]: Ready,
};

export const GameData: PacketHandler<GameDataPacket> = {
  parse(
    packet: PolusBuffer,
    room: Room,
    opts: PacketHandlerOpts
  ): GameDataPacket {
    let data: GameDataPacket = {
      type: "GameData",
      RoomCode: RoomCode.decode(packet.read32()),
      Packets: new Array(),
    };
    if (opts?.isGameDataTo) {
      data.RecipientClientID = packet.readVarInt();
    }
    while (packet.dataRemaining().length != 0) {
      const length = packet.readU16();
      const type = packet.readU8();
      const rawdata = packet.readBytes(length);

      const handler: PacketHandler<GameDataSubtype> = handlers[type];

      if (!handler) {
        throw new Error("Could not find handler for GameData subtype: " + type);
      }

      data.Packets.push(handler.parse(rawdata, room));
    }

    return data;
  },

  serialize(packet: GameDataPacket, room: Room): PolusBuffer {
    var pb = new PolusBuffer();
    pb.write32(RoomCode.encode(packet.RoomCode));
    if (packet.RecipientClientID || packet.RecipientClientID === 0n) {
      pb.writeVarInt(packet.RecipientClientID);
    }
    pb.writeBytes(
      PolusBuffer.concat(
        ...packet.Packets.map((subpacket) => {
          let dataPB;

          const handler: PacketHandler<GameDataSubtype> =
            handlers[subpacket.type];

          if (!handler) {
            throw new Error(
              "Could not find handler for GameData subtype: " + subpacket.type
            );
          }

          dataPB = handler.serialize(subpacket, room);

          let dataPBlenPB = new PolusBuffer(3);
          dataPBlenPB.writeU16(dataPB.length);
          dataPBlenPB.writeU8(subpacket.type);
          return PolusBuffer.concat(dataPBlenPB, dataPB);
        })
      )
    );
    return pb;
  },
};
