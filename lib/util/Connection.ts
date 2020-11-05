
import { EventEmitter } from "events";
import Packet, { ParsedPacket, PacketType, ParsedPacketData } from "../packets/Packet.js";
import { RemoteInfo, Socket } from "dgram";
import Player from "./Player.js"
import DisconnectReason from "../packets/PacketElements/DisconnectReason.js";
import PolusBuffer from "./PolusBuffer.js";
import { HelloPacket } from "../packets/HelloPacket.js";
import Room from "./Room.js";
import { UnreliablePacket, Packet as UnreliablePacketPacket } from "../packets/UnreliablePacket.js";
// @ts-ignore
import assert from "assert";
// @ts-ignore
import util from "util"

let nullRoom = new Room(null);

export default class Connection extends EventEmitter{
    player: Player;
    nonce: number = 1;
    private inGroup:boolean;
    private groupArr: ({type: string, packet: UnreliablePacketPacket})[] = [];
    private packetGroupReliability: PacketType;
    unacknowledgedPackets: Map<number, number> = new Map();
    constructor(public address: RemoteInfo, private socket: Socket, public isToClient: boolean, public ID:number){
        super();
        this.once("message", (msg) => {
            const parsed = new Packet(nullRoom, this.isToClient).parse(new PolusBuffer(msg));
            if (parsed.Type != PacketType.HelloPacket) {
                this.disconnect();
            }
            this.handlePacket(parsed)
        })
    }
    handlePacket(packet: ParsedPacket){
        if (!this.player && packet.Type == PacketType.HelloPacket){
            this.player = new Player((<HelloPacket>packet).Data.Name, (<HelloPacket>packet).Data.ClientVersion, (<HelloPacket>packet).Data.HazelVersion);
            this.player.room = nullRoom;
            this.on("message", (msg) => {
                console.log(this.address.address + ":" + this.address.port + "  ==> S", msg)
                const parsed = new Packet(this.player.room, this.isToClient).parse(new PolusBuffer(msg));
                const serialized = new Packet(this.player.room, this.isToClient).serialize(parsed);
                try {
                    assert.equal(msg.toString('hex'), serialized.buf.toString('hex'))
                } catch(err) {
                    console.log(err)
                }
                // console.log(util.inspect(parsed, {depth: Infinity}))
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
        let pb = new Packet(this.player?(this.player.room?this.player.room:nullRoom):nullRoom, this.isToClient).serialize(o);
        console.log(this.address.address + ":" + this.address.port, " <== S", pb.buf)
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
        this.inGroup = false;
        if(this.groupArr.length > 0) {
            this.write(PacketType.ReliablePacket, {
                Packets: this.groupArr.map(i => {
                    return {type: i.type, ...i.packet}
                })
            })
        }
        this.groupArr = [];
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
        room.handleNewConnection(this);
        this.startPacketGroup();
        this.send("JoinedGame", {
            RoomCode: room.code,
            PlayerClientID: this.ID,
            HostClientID: room.host.ID,
            OtherPlayers: room.connections.map(con => BigInt(con.ID))
        })
        this.send("SetGameCode", {
            RoomCode: room.code
        })
        this.endPacketGroup();
    }
}