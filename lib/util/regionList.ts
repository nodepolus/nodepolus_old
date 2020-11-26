import { Region } from "./region";
import { PolusBuffer } from "./polusBuffer";

export class RegionList {
  selected: number = 0;
  name: string;
  address: string;
  servers: Region[] = [];

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }

  public addServer(name: string, address: string, port: number) {
    this.servers.push(new Region(name, address, port));
  }

  public selectServer(index: number) {
    this.selected = index;
  }

  public getBuffer(): PolusBuffer {
    let buffer = new PolusBuffer();
    buffer.write32(this.selected); // selected server
    buffer.writeString(this.name); // region name
    buffer.writeString(this.address); // region ping ip
    buffer.write32(this.servers.length); // server count
    for (let server of this.servers) {
      buffer.writeString(server.name); //server name: usually <region-name>-MASTER-<number>
      buffer.writeBytes(server.address.split(".").map((e) => parseInt(e))); // server ip as a four byte array
      buffer.write16(server.port); // server port
      buffer.write32(server.failures); // number of connection failures
    }
    return buffer;
  }
}
