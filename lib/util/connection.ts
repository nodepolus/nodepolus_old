import { RemoteInfo, Socket } from "dgram";

import {
  Packet,
  ParsedPacket,
  PacketType,
  ParsedPacketData,
} from "../packets/packet";
import { Player } from "./player";
import {
  DisconnectReason,
  DisconnectReasons,
} from "../packets/packetElements/disconnectReason";
import { PolusBuffer } from "./polusBuffer";
import { HelloPacket } from "../packets/helloPacket";
import { Room } from "./room";
import {
  UnreliablePacket,
  Packet as UnreliablePacketPacket,
} from "../packets/unreliablePacket";
import { GameDataPacketType } from "../packets/subpackets/gameData";
import { AsyncEventEmitter, Events } from "./asyncEventEmitter";
import {
  DisconnectionEvent,
  JoinRoomEvent,
  JoinRoomRequestEvent,
} from "../events";
import { LimboState } from "../data/enums/limboState";
import { ClientVersion } from "../packets/packetElements/clientVersion";
import { SupportedVersions } from "./supportedVersions";

let nullRoom = new Room();

type ConnectionEvents = Events & {
  disconnection: (event: DisconnectionEvent) => Promise<void>;
  message: (msg: Buffer) => Promise<void>;
  packet: (packet: UnreliablePacketPacket) => Promise<void>;
  close: () => Promise<void>;
  joinRoomRequest: (event: JoinRoomRequestEvent) => Promise<void>;
  joinRoom: (event: JoinRoomEvent) => Promise<void>;
};

export class Connection extends AsyncEventEmitter<ConnectionEvents> {
  public netIDs: bigint[] = [];
  player?: Player;
  nonce: number = 1;
  clientVersion?: ClientVersion;
  hazelVersion?: number;
  name?: string;
  room: Room;
  limbo: LimboState = LimboState.PreSpawn;
  isHost?: boolean;
  public inGroup: boolean = false;
  private helloRecieved: boolean = false;
  private groupArr: UnreliablePacketPacket[] = [];
  private packetGroupReliability: PacketType = PacketType.ReliablePacket;
  unacknowledgedPackets: Map<number, number> = new Map();
  private TEMPDONTUSE: boolean = false;
  public isVersionSupported(): boolean {
    return SupportedVersions.some((v) => this.clientVersion?.equals(v));
  }
  constructor(
    public address: RemoteInfo,
    private socket: Socket,
    public isToClient: boolean,
    public ID: number
  ) {
    super();

    this.room = nullRoom;

    this.on("message", async (msg: Buffer) => {
      if (msg[0] != 0x0a && msg[0] != 0x0c) {
        console.log(msg.toString("hex"));
      }
      if (this.TEMPDONTUSE) return;
      this.TEMPDONTUSE = true;
      const parsed = new Packet(this.isToClient).parse(
        new PolusBuffer(msg),
        this.room
      );
      if (parsed.Type != PacketType.HelloPacket) {
        this.disconnect();
      }
      this.handlePacket(parsed);
    });
  }
  handlePacket(packet: ParsedPacket) {
    if (!this.helloRecieved && packet.Type == PacketType.HelloPacket) {
      this.helloRecieved = true;
      this.name = (<HelloPacket>packet).Data.Name;
      this.clientVersion = (<HelloPacket>packet).Data.ClientVersion;
      this.hazelVersion = (<HelloPacket>packet).Data.HazelVersion;
      if (!this.isVersionSupported()) {
        this.disconnect(
          new DisconnectReason(DisconnectReasons.IncorrectVersion)
        );
        return;
      }
      this.on("message", async (msg: Buffer) => {
        // console.log(this.ID, msg.toString('hex'))
        const parsed = new Packet(this.isToClient).parse(
          new PolusBuffer(msg),
          this.room
        );
        // console.log("RawParsed", parsed)
        // const serialized = new Packet(!this.isToClient).serialize(parsed, this.room);
        // try {
        //     if (packet.Type != PacketType.UnreliablePacket) assert.equal(serialized.buf.toString('hex'), msg.toString('hex'))
        // } catch(err) {
        //     console.log("actual  ", serialized.buf.toString('hex'))
        //     console.log("expected", msg.toString('hex'))
        //     console.log(err)
        // }
        this.handlePacket(parsed);
      });
    }

    if (packet.Reliable) {
      this.acknowledgePacket(packet);
    }

    switch (packet.Type) {
      case PacketType.DisconnectPacket:
        this.disconnect();
        break;
      case PacketType.AcknowledgementPacket:
        // @ts-ignore
        this.unacknowledgedPackets.delete(packet.Nonce);
        break;
      case PacketType.PingPacket:
      case PacketType.HelloPacket:
        break;
      case PacketType.UnreliablePacket:
      case PacketType.ReliablePacket:
        (<UnreliablePacket>packet.Data).Packets.forEach(async (subpacket) => {
          await this.emit("packet", subpacket);
        });
    }
  }
  private write(type: PacketType, data: ParsedPacketData) {
    let o: ParsedPacket = {
      Type: type,
      Reliable: Packet.isReliable(type),
      Data: data,
    };
    if (o.Reliable) {
      o.Nonce = this.newNonce();
    }

    let pb = new Packet(this.isToClient).serialize(o, this.room);
    //console.log(this.address.address + ":" + this.address.port, "<== S", pb.buf.toString('hex'))
    this.socket.send(pb.buf, this.address.port, this.address.address);

    // TODO: Ideally our packet types would be separated
    //       and reliable packets would have Nonce marked as required.
    // @ts-ignore
    this.unacknowledgedPackets.set(o.Nonce, 0);

    if (o.Reliable) {
      let interval = setInterval(() => {
        if (!o.Nonce) {
          // We should never actually get here, as we set
          // a nonce for reliable packets above, but we need
          // to appease typescript :)
          throw new Error(
            "Reliable packet missing new nonce, this should not happen."
          );
        }

        const unackedPackets = this.unacknowledgedPackets.get(o.Nonce) || 0;

        if (!unackedPackets) {
          clearInterval(interval);
        } else {
          this.unacknowledgedPackets.set(o.Nonce, unackedPackets + 1);

          if (this.unacknowledgedPackets.get(o.Nonce) == 10) {
            this.disconnect();
            clearInterval(interval);
          } else {
            this.socket.send(pb.buf, this.address.port, this.address.address);
          }
        }
      }, 1000);
    }
  }
  public send(packet: UnreliablePacketPacket) {
    if (!this.inGroup) {
      this.startPacketGroup();
      this.groupArr.push(packet);
      this.endPacketGroup();
    } else {
      this.groupArr.push(packet);
    }
  }
  public sendUnreliable(packet: UnreliablePacketPacket) {
    if (!this.inGroup) {
      this.startUnreliablePacketGroup();
      this.groupArr.push(packet);
      this.endPacketGroup();
    } else {
      this.groupArr.push(packet);
    }
  }
  public startPacketGroup() {
    this.inGroup = true;
    this.packetGroupReliability = PacketType.ReliablePacket;
  }
  public startUnreliablePacketGroup() {
    this.inGroup = true;
    this.packetGroupReliability = PacketType.UnreliablePacket;
  }
  public endPacketGroup() {
    this.inGroup = false;
    if (this.groupArr.length > 0) {
      this.write(this.packetGroupReliability, {
        Packets: this.groupArr,
      });
    }
    this.groupArr = [];
  }
  public endUnreliablePacketGroup = this.endPacketGroup;
  async disconnect(reason?: DisconnectReason) {
    await this.emit("close");
    this.write(PacketType.DisconnectPacket, {
      DisconnectReason: reason ? reason : new DisconnectReason(),
    });
  }
  acknowledgePacket(packet: ParsedPacket) {
    let pb = new Packet(this.isToClient).serialize(
      {
        Type: PacketType.AcknowledgementPacket,
        Reliable: false,
        Nonce: packet.Nonce,
      },
      this.room
    );

    this.socket.send(pb.buf, this.address.port, this.address.address);
  }
  private newNonce() {
    let i = this.nonce;
    this.nonce++;
    return i;
  }
  public moveRoom(room: Room) {
    this.room = room;
    room.handleNewConnection(this);
    this.startPacketGroup();
    this.send({
      type: "JoinedGame",
      RoomCode: room.code,
      PlayerClientID: this.ID,
      HostClientID: room.host?.ID || -1,
      OtherPlayers: room.connections
        .map((con) => BigInt(con.ID))
        .filter((id) => id != BigInt(this.ID)),
    });
    // TODO: AlterGame
    this.send({
      type: "SetGameCode",
      RoomCode: room.code,
    });
    this.endPacketGroup();

    this.limbo = LimboState.PreSpawn;

    if (room.host?.ID == this.ID) {
      this.startPacketGroup();
      this.send({
        type: "PlayerJoinedGame",
        RoomCode: room.code,
        PlayerClientID: 2147483646,
        HostClientID: room.host.ID,
      });
      this.send({
        type: "GameData",
        RoomCode: room.code,
        Packets: [
          {
            type: GameDataPacketType.SceneChange,
            ClientID: 2147483646n,
            Scene: "OnlineGame",
          },
        ],
      });
      this.endPacketGroup();
    }

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
