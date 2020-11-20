import { Unreliable, UnreliablePacket } from "./unreliablePacket";
import { Reliable } from "./reliablePacket";
import { Hello, HelloPacket, HelloPacketData } from "./helloPacket";
import { Disconnect, DisconnectPacket } from "./disconnectPacket";
import {
  Acknowledgement,
  AcknowledgementPacket,
} from "./acknowledgementPacket";
import { Ping, PingPacket } from "./pingPacket";
import { Room } from "../util/room";
import { PolusBuffer } from "../util/polusBuffer";

export enum PacketType {
  UnreliablePacket = 0x00,
  ReliablePacket = 0x01,
  HelloPacket = 0x08,
  DisconnectPacket = 0x09,
  AcknowledgementPacket = 0x0a,
  PingPacket = 0x0c,
}

export type ParsedPacketData =
  | UnreliablePacket
  | DisconnectPacket
  | HelloPacketData;

export interface ParsedPacket {
  Type: PacketType;
  Nonce?: number;
  Reliable: boolean;
  Data?: ParsedPacketData;
}

export interface PacketHandlerOpts {
  toServer?: boolean;
  isGameDataTo?: boolean;
}

export interface PacketHandler<T> {
  parse(packet: PolusBuffer, room: Room, opts?: PacketHandlerOpts): T;
  serialize(packet: T, room: Room): PolusBuffer;
}

export class Packet {
  toServer: boolean;

  constructor(toServer: boolean) {
    this.toServer = toServer;
  }

  /**
   *
   * Parses a raw PolusBuffer packet
   *
   * @param {PolusBuffer} packet
   */
  parse(packet: PolusBuffer, room: Room): ParsedPacket {
    const packetType = packet.readU8();
    switch (packetType) {
      case PacketType.ReliablePacket:
        return {
          Reliable: true,
          Type: PacketType.ReliablePacket,
          ...Reliable.parse(packet, room, {
            toServer: this.toServer,
          }),
        };

      case PacketType.UnreliablePacket:
        return {
          Reliable: false,
          Type: PacketType.UnreliablePacket,
          Data: Unreliable.parse(packet, room, {
            toServer: this.toServer,
          }),
        };

      case PacketType.HelloPacket:
        return {
          Reliable: true,
          Type: PacketType.HelloPacket,
          ...Hello.parse(packet, room),
        };

      case PacketType.DisconnectPacket:
        return {
          Reliable: false,
          Type: PacketType.DisconnectPacket,
          Data: Disconnect.parse(packet, room),
        };

      case PacketType.AcknowledgementPacket:
        return {
          Reliable: false,
          Type: PacketType.AcknowledgementPacket,
          ...Acknowledgement.parse(packet, room),
        };

      case PacketType.PingPacket:
        return {
          Reliable: true,
          Type: PacketType.PingPacket,
          ...Ping.parse(packet, room),
        };

      default:
        throw new TypeError(
          "Unknown Hazel Packet Type: " + PacketType[packetType]
        );
    }
  }

  serialize(packet: ParsedPacket, room: Room): PolusBuffer {
    var buf = new PolusBuffer();
    buf.writeU8(packet.Type);
    switch (packet.Type) {
      case PacketType.ReliablePacket:
        buf.writeBytes(Reliable.serialize(packet, room));
        break;

      case PacketType.UnreliablePacket:
        buf.writeBytes(
          Unreliable.serialize(packet.Data as UnreliablePacket, room)
        );
        break;

      case PacketType.HelloPacket:
        buf.writeBytes(Hello.serialize(packet as HelloPacket, room));
        break;

      case PacketType.DisconnectPacket:
        buf.writeBytes(
          Disconnect.serialize(packet.Data as DisconnectPacket, room)
        );
        break;

      case PacketType.AcknowledgementPacket:
        buf.writeBytes(
          Acknowledgement.serialize(packet as AcknowledgementPacket, room)
        );
        break;

      case PacketType.PingPacket:
        buf.writeBytes(Ping.serialize(packet as PingPacket, room));
        break;
    }
    return buf;
  }

  static isReliable(type: PacketType) {
    switch (type) {
      case PacketType.ReliablePacket:
        return true;

      case PacketType.UnreliablePacket:
        return false;

      case PacketType.HelloPacket:
        return true;

      case PacketType.DisconnectPacket:
        return false;

      case PacketType.AcknowledgementPacket:
        return false;

      case PacketType.PingPacket:
        return true;

      default:
        throw new TypeError("Unknown Hazel Packet Type: " + PacketType[type]);
    }
  }
}
