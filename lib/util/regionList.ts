import { Region } from "./region";
import { PolusBuffer } from "./polusBuffer";

export class RegionList {
    type: number;
    name: string;
    address: string;
    servers: Region[] = [];

    constructor(type: number, name: string, address: string) {
        this.type = type;
        this.name = name;
        this.address = address;
    }

    public addServer(name: string, address: string, port: number) {
        this.servers.push(new Region(name, address, port));
    }

    public getBuffer(): PolusBuffer {
        let buffer = new PolusBuffer();
        buffer.write32(this.type); // unknown purpose: always 1 for innersloth servers, and 0 for custom servers (???)
        buffer.writeString(this.name); // region name
        buffer.writeString(this.address); // region ping ip
        buffer.write32(this.servers.length); // server count
        for (let server of this.servers) {
            buffer.writeString(server.name); //server name: usually <region-name>-MASTER-<number>
            buffer.writeBytes(server.address.split(".").map(e => parseInt(e))); // server ip as a four byte array
            buffer.write16(server.port); // server port
            buffer.write32(0); // unknown purpose: typically 0x0000 (???)
        }
        return buffer;
    }
}