import { EventEmitter } from "events";
import { createSocket, RemoteInfo, Socket } from "dgram";
import { addr2str } from "../util/misc";
import { Packet, PacketType } from "./packets/Packet";
import PolusBuffer from "../util/PolusBuffer";
import { HelloPacketData } from "./packets/HelloPacket";
import { UnreliablePacketData } from "./packets/UnreliablePacket";
import { FreeWeekendState } from "./packets/subpackets/FreeWeekend";
import Text from "../util/Text";
import { Room } from '../../lib/util/Room'

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
  room: Room
    sock: Socket;
    private clientMap: Map<string, ClientData> = new Map();
    constructor(public config: AnnouncementConfig){
        super();
        config = Object.assign({
            defaultMessage: new Text("Set a message in the config!"),
            address: "0.0.0.0",
            port: 22024,
            freeWeekend: FreeWeekendState.NotFree
        }, config);

        this.sock = createSocket('udp4')
        this.room = new Room()
    }

    listen(){
        return new Promise((res, rej)=>{
            this.sock.bind(this.config.port, this.config.address, () => {
                res();
                this.sock.off("error", rej);
                this.sock.on("message", (buf, info)=>{
                    let client = this.getClient(info);
                    if (!client) throw new Error('Could not get client')
                    let packet = Packet.parse(new PolusBuffer(buf), this.room);
                    if (packet.Reliable){
                      // @ts-ignore
                        this.ack(info, packet.Nonce);
                    }
                    switch(packet.Type){
                        case PacketType.HelloPacket:
                            let data = <HelloPacketData>packet.Data;
                            client.announceId = data.LastAnnouncement;
                            client.language = data.Language;
                            if (this.listenerCount("connect") == 0){
                              const packets: UnreliablePacketData[] = [ {
                                type: "AnnouncementData",
                                Id: this.generateId(),
                                Text: this.config.defaultMessage.text
                              } ]

                              if (this.config.freeWeekend) {
                                packets.push({
                                  type: 'FreeWeekend',
                                  FreeState: this.config.freeWeekend
                                })
                              }

                              this.send(packets, client)
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
                Text: announcement.message.text
            },
            {
                type: "FreeWeekend",
                FreeState: announcement.freeWeekend
            }
        ], client);
    }
    public sendShouldCache(client: ClientData){
        this.send([
            {
                type: "CacheAnnouncement"
            }
        ], client);
    }
    public send(packets: UnreliablePacketData[], client: ClientData){
        //we never send unreliably, so nonce implementation can be in here
        let Nonce = this.incrementNonce(client);
        let i = 0;
        let interval: NodeJS.Timeout;
        let data = Packet.serialize({
            Type: PacketType.ReliablePacket,
            Reliable: true,
            Nonce,
            Data: {
                Packets: packets
            }
        }, this.room).buf;
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
    private getClient(info: RemoteInfo): ClientData | null{
        let addr = addr2str(info)
        if (!this.clientMap.has(addr)) this.clientMap.set(addr, {nonce: 0, announceId: BigInt(0), language: BigInt(0), info});
        return this.clientMap.get(addr) || null
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
        this.sock.send(Packet.serialize({
            Type: PacketType.AcknowledgementPacket,
            Reliable: false,
            Nonce: nonce,
        }, this.room).buf, info.port, info.address);
    }
}