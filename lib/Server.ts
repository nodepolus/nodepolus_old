import { Socket, createSocket, RemoteInfo } from "dgram";
import { EventEmitter } from "events";
import Room from "./util/Room.js";
import Packet, { ParsedPacket } from "./packets/Packet.js";
import Connection from "./util/Connection.js";

class LimboRoom extends Room {
    constructor() {
        super();
    }
}

class Server extends EventEmitter {
    port: number;
    sock: Socket;
    rooms: Map<string, Room>;
    clientRoomMap: Map<RemoteInfo, Room>;
    clientConnectionMap: Map<RemoteInfo, Connection>;
    LimboRoom: LimboRoom;
    constructor(port = 22023) {
        super();
        this.port = port;
        this.LimboRoom = new LimboRoom();
        this.sock = createSocket("udp4");
        this.sock.on("listening", () => this.emit("listening", this.port));
        this.sock.on("message", (msg, remote) => {
            if(!this.clientConnectionMap.has(remote)) {
                let conn = new Connection(this.LimboRoom, remote)
                this.clientConnectionMap.set(remote, conn);
                conn.on("packet", (packet) => {
                    this.handlePacket(packet, conn)
                });
            }
            this.clientConnectionMap.get(remote).emit("message", msg);
        });
        this.sock.bind(this.port);
    }
    private handlePacket(packet: ParsedPacket, connection: Connection){
        
    }
}

export default Server;