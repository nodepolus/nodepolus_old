import os from 'os';
import fs from 'fs';
import dns from 'dns';
import util from 'util';

const lookup = util.promisify(dns.lookup);

export class regioninfoDatEditor {
  regioninfoDat: string;
  constructor() {
    let home = os.homedir();
    if (fs.existsSync(home + "/AppData/LocalLow/Innersloth/Among Us/regioninfo.dat"))
      this.regioninfoDat = home + "/AppData/LocalLow/Innersloth/Among Us/regioninfo.dat";
    else
      throw new Error("regioninfo.dat not found!");
  }

  public async setServer(name: string, ip: string, port: number) {
    if (!this.regioninfoDat) throw new Error("regioninfo.dat not found!");

    let address = (await lookup(ip)).address;
    let bytes = [];

    bytes.push(...[0, 0, 0, 0]);

    bytes.push(Buffer.from(name).length);
    bytes.push(...Buffer.from(name));

    bytes.push(Buffer.from(ip).length);
    bytes.push(...Buffer.from(ip));

    bytes.push(...[1, 0, 0, 0]);

    bytes.push(Buffer.from(name + "-Master-1").length);
    bytes.push(...Buffer.from(name + "-Master-1"));

    let addressInt = address.split('.').reduce(function (ipInt, octet) { return (ipInt << 8) + parseInt(octet, 10) }, 0) >>> 0;
    let addressBuffer = Buffer.alloc(addressInt.toString(16).length / 2);
    addressBuffer.writeUInt32BE(addressInt);
    bytes.push(...addressBuffer.values());

    let portBuffer = Buffer.alloc(2);
    portBuffer.writeInt16LE(port);
    bytes.push(...portBuffer.values());

    bytes.push(...[0, 0, 0, 0]);
    
    fs.writeFileSync(this.regioninfoDat, Buffer.from(bytes), "hex");
  }
}