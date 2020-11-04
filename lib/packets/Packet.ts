import Unreliable, { UnreliablePacket } from "./UnreliablePacket.js";
import Reliable from "./ReliablePacket.js";
import HelloPacket, { HelloPacketData } from "./HelloPacket.js";
import Disconnect, {DisconnectPacket} from "./DisconnectPacket.js";
import AcknowledgementPacket from "./AcknowledgementPacket.js";
import Ping from "./PingPacket.js";
import Room from "../util/Room.js";
import PolusBuffer from "../util/PolusBuffer.js";

export enum PacketType {
    UnreliablePacket = 0x00,
    ReliablePacket = 0x01,
    HelloPacket = 0x08,
    DisconnectPacket = 0x09,
    AcknowledgementPacket = 0x0a,
    PingPacket = 0x0c
};

export type ParsedPacketData = UnreliablePacket | DisconnectPacket | HelloPacketData | UnreliablePacket

export interface ParsedPacket {
    Type: PacketType,
    Nonce?: number,
    Reliable: boolean,
    Data?: ParsedPacketData
};

export default class Packet {
    constructor(private room: Room, private toServer: boolean){}
    UnreliablePacketHandler = new Unreliable(this.room, this.toServer);
    ReliablePacketHandler = new Reliable(this.room, this.toServer);
    HelloPacketHandler = new HelloPacket();
    DisconnectPacketHandler = new Disconnect(this.room);
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
                //@ts-ignore
                buf.writeBytes(this.ReliablePacketHandler.serialize(packet));
                break;

            case PacketType.UnreliablePacket:
                //@ts-ignore
                buf.writeBytes(this.UnreliablePacketHandler.serialize(packet.Data));
                break;

            case PacketType.HelloPacket:
                //@ts-ignore
                buf.writeBytes(this.HelloPacketHandler.serialize(packet));
                break;

            case PacketType.DisconnectPacket:
                //@ts-ignore
                buf.writeBytes(this.DisconnectPacketHandler.serialize(packet.Data));
                break;

            case PacketType.AcknowledgementPacket:
                //@ts-ignore
                buf.writeBytes(this.AcknowledgementPacketHandler.serialize(packet));
                break;

            case PacketType.PingPacket:
                //@ts-ignore
                buf.writeBytes(this.PingPacketHandler.serialize(packet));
                break;
        }
        return buf;
    }

    static isReliable(type:PacketType) {
        switch (type) {
            case PacketType.ReliablePacket:
                return true

            case PacketType.UnreliablePacket:
                return false

            case PacketType.HelloPacket:
                return true

            case PacketType.DisconnectPacket:
                return false

            case PacketType.AcknowledgementPacket:
                return false

            case PacketType.PingPacket:
                return true

            default:
                throw new TypeError("Unknown Hazel Packet Type: " + PacketType[type]);
        }
    }
};