import { EventEmitter } from "events";
import { createSocket, RemoteInfo, Socket } from "dgram";
import { addr2str } from "../util/misc";
import Packet, { PacketType } from "./packets/Packet";
import PolusBuffer from "../util/PolusBuffer";
import { HelloPacketData } from "./packets/HelloPacket";
import { UnreliablePacket, UnreliablePacketData } from "./packets/UnreliablePacket";
import Acknowledgement from "../packets/AcknowledgementPacket";
import AnnouncementData from "./packets/subpackets/AnnouncementData";
import { FreeWeekendState } from "./packets/subpackets/FreeWeekend";
import Text from "../util/Text";

export interface ClientData {
    nonce: number,
    announceId: bigint,
    language: bigint,
    info: RemoteInfo
}

export interface AnnouncementConfig {
    address?: string,
    port?: number,
    defaultMessage: Text,
    freeWeekend?: FreeWeekendState
}
export interface Announce {
    message: Text,
    freeWeekend?: FreeWeekendState
}

export default class AnnouncementServer extends EventEmitter{
    sock: Socket;
    private clientMap: Map<string, ClientData> = new Map();
    private packet = new Packet();
    constructor(public config: AnnouncementConfig){
        super();
        config = Object.assign({
            defaultMessage: new Text("Set a message in the config!"),
            address: "0.0.0.0",
            port: 22024,
            freeWeekend: FreeWeekendState.NotFree
        }, config);
        console.log(config.defaultMessage)
    }

    listen(){
        return new Promise((res, rej)=>{
            this.sock = createSocket("udp4");
            this.sock.bind(this.config.port, this.config.address, () => {
                res();
                this.sock.off("error", rej);
                this.sock.on("message", (buf, info)=>{
                    let client = this.getClient(info);
                    let packet = this.packet.parse(new PolusBuffer(buf));
                    if (packet.Reliable){
                        this.ack(info, packet.Nonce);
                    }
                    switch(packet.Type){
                        case PacketType.HelloPacket:
                            let data = <HelloPacketData>packet.Data;
                            client.announceId = data.LastAnnouncement;
                            client.language = data.Language;
                            if (this.listenerCount("connect") == 0){
                                this.send([
                                    {
                                        type: "AnnouncementData",
                                        Id: this.generateId(),
                                        Text: this.config.defaultMessage.text
                                    },
                                    {
                                        type: "FreeWeekend",
                                        FreeState: this.config.freeWeekend
                                    }
                                ], client);
                            }else{
                                this.emit("connect", client);
                            }
                            break;
                        case PacketType.DisconnectPacket:
                            
                    }
                })
            });
            this.sock.once("error", rej);
        });
    }
    public sendAnnouncement(announcement: Announce, client: ClientData){
        this.send([
            {
                type: "AnnouncementData",
                Id: this.generateId(),
                Text: this.config.defaultMessage.text
            },
            {
                type: "FreeWeekend",
                FreeState: this.config.freeWeekend
            }
        ], client);
    }
    public send(packets: UnreliablePacketData[], client: ClientData){
        //we never send unreliably, so nonce implementation can be in here
        let Nonce = this.incrementNonce(client);
        let i = 0;
        let interval: NodeJS.Timeout;
        let data = new Packet().serialize({
            Type: PacketType.ReliablePacket,
            Reliable: true,
            Nonce,
            Data: {
                Packets: packets
            }
        }).buf;
        let reliableSend = ()=>{
            if (i++ > 6) {
                clearInterval(interval);

            }
            console.log(data);
            this.sock.send(data, client.info.port, client.info.address, (error)=>{
                if (error)this.emit("error", error);
                clearInterval(interval)
            });
        }
        interval = setInterval(reliableSend, 1000);
    }
    private getClient(info: RemoteInfo): ClientData{
        let addr = addr2str(info)
        if (!this.clientMap.has(addr)) this.clientMap.set(addr, {nonce: 0, announceId: BigInt(0), language: BigInt(0), info});
        return this.clientMap.get(addr);
    }
    private incrementNonce(client: ClientData): number{
        return client.nonce++;
    }
    private generateId(avoid: bigint = BigInt(0)){
        let id = avoid;
        while(id == avoid){
            id = BigInt(Math.floor(Math.random()*1000));
        }
        return id;
    }
    private ack(info: RemoteInfo, nonce: number){
        this.sock.send(new Packet().serialize({
            Type: PacketType.AcknowledgementPacket,
            Reliable: false,
            Nonce: nonce,
        }).buf, info.port, info.address);
    }
}