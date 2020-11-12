import { EventEmitter } from 'events'
import { RemoteInfo, Socket } from 'dgram'
import * as assert from 'assert'

import Packet, { ParsedPacket, PacketType, ParsedPacketData } from '../packets/Packet'
import Player from './Player'
import DisconnectReason from '../packets/PacketElements/DisconnectReason'
import PolusBuffer from './PolusBuffer'
import { HelloPacket } from '../packets/HelloPacket'
import { Room } from './Room'
import { UnreliablePacket, Packet as UnreliablePacketPacket } from '../packets/UnreliablePacket'

let nullRoom = new Room()

export default class Connection extends EventEmitter{
    player?: Player;
    nonce: number = 1;
    private inGroup?: boolean;
    private groupArr: UnreliablePacketPacket[] = [];
    private packetGroupReliability: PacketType = PacketType.ReliablePacket
    unacknowledgedPackets: Map<number, number> = new Map();
    constructor(public address: RemoteInfo, private socket: Socket, public isToClient: boolean, public ID:number){
        super();
        this.once("message", (msg) => {
            const parsed = new Packet(this.isToClient).parse(new PolusBuffer(msg), nullRoom);
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
              if (!this.player?.room) {
                throw new Error('Tried to parse packet for a player without a room')
              }
                // console.log(msg.toString('hex'))
                const parsed = new Packet(this.isToClient).parse(new PolusBuffer(msg), this.player.room)
                // console.log("RawParsed", parsed)
                const serialized = new Packet(this.isToClient).serialize(parsed);
                try {
                    if (packet.Type != PacketType.UnreliablePacket)
                      assert.equal(serialized.buf.toString('hex'), msg.toString('hex'))
                } catch(err) {
                    console.log("actual  ", serialized.buf.toString('hex'))
                    console.log("expected", msg.toString('hex'))
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
              // if (!packet.Nonce) throw new Error('Error: AcknowledgePackage missing nonce')
              // @ts-ignore
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
      let o: ParsedPacket = {
          Type: type,
          Reliable: Packet.isReliable(type),
          Data: data
      }
      if(o.Reliable) {
          o.Nonce = this.newNonce();
      }
      let pb = new Packet(this.isToClient).serialize(o);
      //console.log(this.address.address + ":" + this.address.port, "<== S", pb.buf.toString('hex'))
      this.socket.send(pb.buf, this.address.port, this.address.address)

      const nonce = o.Nonce

      if (nonce === undefined) {
        throw new Error('Got undefined nonce in packet')
      }

      this.unacknowledgedPackets.set(nonce, 0);
      if(o.Reliable) {
          let interval = setInterval(() => {
            const unackedPackets = this.unacknowledgedPackets.get(nonce) || 0

            if (!unackedPackets) {
              clearInterval(interval)
            } else {
              this.unacknowledgedPackets.set(nonce, unackedPackets + 1)

              if(this.unacknowledgedPackets.get(nonce) == 10) {
                  this.disconnect()
                  clearInterval(interval)
              } else {
                  this.socket.send(pb.buf, this.address.port, this.address.address)
              }
            }
          }, 1000)
      }
  }
    public send(packet: UnreliablePacketPacket) {
        if(!this.inGroup) {
            this.startPacketGroup();
            this.groupArr.push(packet)
            this.endPacketGroup();
        } else {
            this.groupArr.push(packet)
        }
    }
    public sendUnreliable(packet: UnreliablePacketPacket) {
        if (!this.inGroup) {
            this.startUnreliablePacketGroup();
            this.groupArr.push(packet)
            this.endPacketGroup();
        } else {
            this.groupArr.push(packet)
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
            this.write(this.packetGroupReliability, {
                Packets: this.groupArr
            })
        }
        this.groupArr = [];
    }
    public endUnreliablePacketGroup = this.endPacketGroup;
    disconnect(reason?: DisconnectReason) {
        this.emit("close")
        this.write(PacketType.DisconnectPacket, {DisconnectReason: reason?reason:new DisconnectReason()})
    }
    acknowledgePacket(packet: ParsedPacket) {
        let pb = new Packet(this.isToClient).serialize({
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
      if (!this.player) throw new Error('Tried to move room while missing a player')

        this.player.room = room;
        room.handleNewConnection(this);
        this.startPacketGroup();
        this.send({
          type: 'JoinedGame',
          RoomCode: room.code,
          PlayerClientID: this.ID,
          HostClientID: room.host?.ID || -1,
          OtherPlayers: room.connections.map(con => BigInt(con.ID)).filter(id => id != BigInt(this.ID)),
        })

        this.send({
          type: 'SetGameCode',
          RoomCode: room.code
        })

        this.endPacketGroup();
        // if(room.host.ID == this.ID) {
        //     this.startPacketGroup();
        //     this.send("PlayerJoinedGame", {
        //         RoomCode: room.code,
        //         PlayerClientID: 2147483646,
        //         HostClientID: room.host.ID
        //     })
        //     this.send("GameData", {
        //         RoomCode: room.code,
        //         Packets: [
        //             {
        //                 //@ts-ignore
        //                 type: GameDataPacketType.SceneChange,
        //                 ClientID: 2147483646n,
        //                 Scene: "OnlineGame"
        //             }
        //         ]
        //     })
        //     this.endPacketGroup();
        // }
        // this.startPacketGroup();
        // this.send("JoinedGame", {
        //     RoomCode: room.code,
        //     PlayerClientID: this.ID,
        //     HostClientID: room.host.ID,
        //     OtherPlayers: room.connections.map(con => BigInt(con.ID)).filter(id => id != BigInt(this.ID))
        // })
        // this.send("AlterGame", {
        //     RoomCode: room.code,
        //     AlterGameTag: 1,
        //     IsPublic: false
        // })
        // this.endPacketGroup();
    }
}
