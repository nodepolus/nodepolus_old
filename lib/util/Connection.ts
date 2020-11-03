
import { EventEmitter } from "events";
import Packet, { ParsedPacket, PacketType } from "../packets/Packet";
import Room from "./Room"
import PolusBuffer from "./PolusBuffer";
import { RemoteInfo } from "dgram";

export default class Connection extends EventEmitter{
    room: Room;
    address: RemoteInfo;
    nonce: number;
    private handledHello: boolean;
    constructor(room: Room, address: RemoteInfo){
        super();

        this.on("message", (msg) => {
            const parsed = new Packet(room, true).parse(msg);
            this.handlePacket(parsed);
        })
    }
    handlePacket(packet: ParsedPacket){
        if (!this.handledHello && packet.Type == PacketType.HelloPacket){

        }

        switch (packet.Type){
        }
    }
    write(buffer: PolusBuffer){

    }
}