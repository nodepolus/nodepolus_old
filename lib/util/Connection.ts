
import { EventEmitter } from "events";
import Packet, { ParsedPacket, PacketType, ParsedPacketData } from "../packets/Packet.js";
import { RemoteInfo, Socket } from "dgram";
import Player from "./Player"
import DisconnectReason from "../packets/PacketElements/DisconnectReason.js";
import PolusBuffer from "./PolusBuffer.js";
import { HelloPacket } from "../packets/HelloPacket.js";
import Room from "./Room.js";
import { UnreliablePacket, Packet as UnreliablePacketPacket } from "../packets/UnreliablePacket.js";

let nullRoom = new Room();

export default class Connection extends EventEmitter{
    player: Player;
    address: RemoteInfo;
    nonce: number = 0;
    private inGroup:boolean;
    private groupArr: ({type: string, packet: UnreliablePacketPacket})[];
    private packetGroupReliability: PacketType;
    unacknowledgedPackets: Map<number, number> = new Map();
    constructor(address: RemoteInfo, private socket: Socket, public isToClient: boolean){
        super();
        this.once("message", (msg) => {
            if(msg.Type != PacketType.HelloPacket) {
                this.disconnect();
            }
            this.handlePacket(new Packet(nullRoom, this.isToClient).parse(msg))
        })
    }
    handlePacket(packet: ParsedPacket){
        if (!this.player && packet.Type == PacketType.HelloPacket){
            this.player = new Player((<HelloPacket>packet).Data.Name, (<HelloPacket>packet).Data.ClientVersion, (<HelloPacket>packet).Data.HazelVersion);
            this.on("message", (msg) => {
                const parsed = new Packet(this.player.room, this.isToClient).parse(msg);
                this.handlePacket(parsed);
            })
        }

        if(packet.Reliable) {
            this.acknowledgePacket(packet)
        }

        switch (packet.Type){
            case PacketType.DisconnectPacket:
                this.disconnect();
                break;
            case PacketType.AcknowledgementPacket:
                this.unacknowledgedPackets.delete(packet.Nonce)
                break;
            case PacketType.PingPacket:
            case PacketType.HelloPacket:
                break;
            case PacketType.UnreliablePacket:
            case PacketType.ReliablePacket:
                (<UnreliablePacket>packet.Data).Packets.forEach(subpacket => {
                    this.emit("packet", subpacket)
                })
        }
    }
    private write(type: PacketType, data: ParsedPacketData){
        let o:ParsedPacket = {
            Type: type,
            Reliable: Packet.isReliable(type),
            Data: data
        }
        if(o.Reliable) {
            o.Nonce = this.newNonce();
        }
        let pb = new Packet(this.player.room, this.isToClient).serialize(o);
        this.socket.send(pb.buf, this.address.port, this.address.address)
        this.unacknowledgedPackets.set(o.Nonce, 0);
        let interval = setInterval(() => {
            if(this.unacknowledgedPackets.has(o.Nonce)) {
                this.unacknowledgedPackets.set(o.Nonce, this.unacknowledgedPackets.get(o.Nonce) + 1);
                if(this.unacknowledgedPackets.get(o.Nonce) == 10) {
                    this.disconnect()
                    clearInterval(interval)
                } else {
                    this.socket.send(pb.buf, this.address.port, this.address.address)
                }
            } else {
                clearInterval(interval)
            }
        }, 1000)
    }
    public send(type: string, packet: UnreliablePacketPacket) {
        if(!this.inGroup) {
            this.startPacketGroup();
            this.groupArr.push({type, packet})
            this.endPacketGroup();
        } else {
            this.groupArr.push({ type, packet })
        }
    }
    public sendUnreliable(type: string, packet: UnreliablePacketPacket) {
        if (!this.inGroup) {
            this.startUnreliablePacketGroup();
            this.groupArr.push({ type, packet })
            this.endPacketGroup();
        } else {
            this.groupArr.push({ type, packet })
        }
    }
    public startPacketGroup() {
        this.inGroup = true;
        this.packetGroupReliability = PacketType.ReliablePacket
    }
    public startUnreliablePacketGroup() {
        this.inGroup = true;
        this.packetGroupReliability = PacketType.UnreliablePacket
    }
    public endPacketGroup() {
        this.write(PacketType.ReliablePacket, {
            Packets: this.groupArr.map(i => {
                return {Type: i.type, ...i.packet}
            })
        })
    }
    public endUnreliablePacketGroup = this.endPacketGroup;
    disconnect() {
        this.emit("closed")
        this.write(PacketType.DisconnectPacket, {DisconnectReason: new DisconnectReason()})
    }
    acknowledgePacket(packet: ParsedPacket) {
        let pb = new Packet(this.player.room, this.isToClient).serialize({
            Type: PacketType.AcknowledgementPacket,
            Reliable: false,
            Nonce: packet.Nonce
        })
        this.socket.send(pb.buf, this.address.port, this.address.address)
    }
    private newNonce() {
        let i = this.nonce;
        this.nonce++;
        return i;
    }
    public moveRoom(room: Room) {
        this.player.room = room;
        this.startPacketGroup();
        this.send("JoinedGame")
    }
}