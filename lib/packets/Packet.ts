import Unreliable from "./UnreliablePacket";
import Reliable from "./ReliablePacket";
import HelloPacket from "./HelloPacket";
import DisconnectPacket from "./DisconnectPacket";
import AcknowledgementPacket from "./AcknowledgementPacket";
import Ping from "./PingPacket";
import Room from "../util/Room";
import PolusBuffer from "../util/PolusBuffer";

export enum PacketType {
    UnreliablePacket = 0x00,
    ReliablePacket = 0x01,
    HelloPacket = 0x08,
    DisconnectPacket = 0x09,
    AcknowledgementPacket = 0x0a,
    PingPacket = 0x0c
};

export interface ParsedPacket {
    Type: PacketType,
    Nonce?: number,
    Reliable: boolean,
    Data?: any
};

export default class Packet {
    constructor(private room: Room, private toServer: boolean){}
    UnreliablePacketHandler = new Unreliable(this.room, this.toServer);
    ReliablePacketHandler = new Reliable(this.toServer);
    HelloPacketHandler = new HelloPacket();
    DisconnectPacketHandler = new DisconnectPacket(this.room);
    AcknowledgementPacketHandler = new AcknowledgementPacket();
    PingPacketHandler = new Ping();
    /**
     * 
     * Parses a raw PolusBuffer packet
     * 
     * @param {PolusBuffer} packet
     */
    parse(packet: PolusBuffer): ParsedPacket {
        const packetType = packet.readU8();
        switch (packetType) {
            case PacketType.ReliablePacket:
                return { Reliable: true, Type: PacketType.ReliablePacket, ...this.ReliablePacketHandler.parse(packet) };

            case PacketType.UnreliablePacket:
                return { Reliable: false, Type: PacketType.UnreliablePacket, Data: this.UnreliablePacketHandler.parse(packet) };

            case PacketType.HelloPacket:
                return { Reliable: true, Type: PacketType.HelloPacket, ...this.HelloPacketHandler.parse(packet) };

            case PacketType.DisconnectPacket:
                return { Reliable: false, Type: PacketType.DisconnectPacket, Data: this.DisconnectPacketHandler.parse(packet) };

            case PacketType.AcknowledgementPacket:
                return { Reliable: false, Type: PacketType.AcknowledgementPacket, ...this.AcknowledgementPacketHandler.parse(packet) };

            case PacketType.PingPacket:
                return { Reliable: true, Type: PacketType.PingPacket, ...this.PingPacketHandler.parse(packet) };

            default:
                throw new TypeError("Unknown Hazel Packet Type: " + PacketType[packetType]);
        }
    };
    
    serialize(packet: ParsedPacket): PolusBuffer {
        var buf = new PolusBuffer();
        buf.writeU8(packet.Type);
        switch(packet.Type) {
            case PacketType.ReliablePacket:
                buf.writeBytes(this.ReliablePacketHandler.serialize(packet));
                break;

            case PacketType.UnreliablePacket:
                buf.writeBytes(this.UnreliablePacketHandler.serialize(packet.Data));
                break;

            case PacketType.HelloPacket:
                buf.writeBytes(this.HelloPacketHandler.serialize(packet.Data));
                break;

            case PacketType.DisconnectPacket:
                buf.writeBytes(this.DisconnectPacketHandler.serialize(packet.Data));
                break;

            case PacketType.AcknowledgementPacket:
                buf.writeBytes(this.AcknowledgementPacketHandler.serialize(packet.Data));
                break;

            case PacketType.PingPacket:
                buf.writeBytes(this.PingPacketHandler.serialize(packet.Data));
                break;
        }
        return buf;
    }
};