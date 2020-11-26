import { Region } from "./region";
import { PolusBuffer } from "./polusBuffer";

export class RegionList {
  selected: number = 0;
  name: string;
  address: string;
  servers: Region[] = [];

  constructor(name: string = "", address: string = "") {
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

  public static fromBuffer(buffer: PolusBuffer): RegionList {
    let selected = buffer.read32();
    let name = buffer.readString();
    let address = buffer.readString();
    let servers = new Array(buffer.read32());
    let regionList = new RegionList(name, address);
    regionList.selected = selected;
    regionList.servers = servers;
    for (let i = 0; i < regionList.servers.length; i++) {
      let name = buffer.readString();
      let address = buffer.readBytes(4).buf.join(".");
      let port = buffer.read16();
      let failures = buffer.read32();
      regionList.servers[i] = new Region(name, address, port);
      regionList.servers[i].failures = failures;
    }
    return regionList;
  }
}
