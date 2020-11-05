import { Socket, createSocket, RemoteInfo } from "dgram";
import { EventEmitter } from "events";
import Room from "./util/Room.js";
import Packet, { ParsedPacket } from "./packets/Packet.js";
import Connection from "./util/Connection.js";
import { Packet as Subpacket } from "./packets/UnreliablePacket.js";
import { GameCreatePacket } from "./packets/Subpackets/GameCreate.js";
import { JoinedGamePacket } from "./packets/Subpackets/JoinedGame.js";
import { SetGameCodePacket } from "./packets/Subpackets/SetGameCode.js";
import { JoinGamePacket } from "./packets/Subpackets/JoinGame.js";
import { addr2str } from "./util/misc.js";

class Server extends EventEmitter {
    port: number;
    sock: Socket;
    rooms: Map<string, Room> = new Map();
    clientConnectionMap: Map<string, Connection>;
    private clientIDIncrementer = 256;
    constructor(port:number = 22023) {
        super();
        this.clientConnectionMap = new Map();
        this.port = port;
        this.sock = createSocket("udp4");
        this.sock.on("listening", () => this.emit("listening", this.port));
        this.sock.on("message", (msg, remote) => {
            if(!this.clientConnectionMap.has(addr2str(remote))) {
                this.buildConnection(remote)
            }
            this.clientConnectionMap.get(addr2str(remote)).emit("message", msg);
        });
        this.sock.bind(this.port);
    }
    private handlePacket(packet: Subpacket, connection: Connection){
        // @ts-ignore
        switch(packet.type) {
            case 'GameCreate':
                let room = new Room(this);
                room.settings = (<GameCreatePacket>packet).RoomSettings
                this.emit("roomCreated", room);
                this.rooms.set(room.code, room);
                connection.send("SetGameCode", <SetGameCodePacket>{
                    RoomCode: room.code
                });
                break;
            case 'JoinGame':
                if(this.rooms.has((<JoinGamePacket>packet).RoomCode)) {
                    connection.moveRoom(this.rooms.get((<JoinGamePacket>packet).RoomCode))
                } else {
                    connection.disconnect()
                }
                break;
            default:    
                connection.player.room.handlePacket(packet, connection);
        }
    }
    private buildConnection(remote:RemoteInfo) {
        let conn = new Connection(remote, this.sock, true, this.requestClientID())
        this.clientConnectionMap.set(addr2str(remote), conn);
        conn.on("packet", (packet: Subpacket) => {
            this.handlePacket(packet, conn)
        });
        conn.on("closed", () => {
            this.clientConnectionMap.delete(addr2str(remote));
        })
    }
    private requestClientID() {
        let i = this.clientIDIncrementer;
        this.clientIDIncrementer++;
        return i;
    }
}

export default Server;