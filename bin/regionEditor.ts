import os from "os";
import fs from "fs";
import { PolusBuffer } from "../lib/util/polusBuffer";
import { RegionList } from "../lib/util/regionList";
import path from "path";
import dns from "dns";
import util from "util";
const lookup = util.promisify(dns.lookup);

let regionFile: string;

if (process.argv[2] == "set-region" && !!process.argv[5]) {
  regionFile = process.argv[5];
} else if (process.argv[2] == "add-server" && !!process.argv[6]) {
  regionFile = process.argv[6];
} else {
  let home = os.homedir();
  let file = path.join(
    home,
    "/AppData/LocalLow/Innersloth/Among Us/regioninfo.dat"
  );
  if (fs.existsSync(file)) {
    regionFile = file;
  } else {
    throw new Error("regioninfo.dat not found!");
  }
}

function writeBuffer(regionList: PolusBuffer) {
  fs.writeFileSync(regionFile, regionList.buf, "hex");
}

(async () => {
  if (process.argv[2] == "set-region") {
    let list = new RegionList(
      process.argv[3],
      (await lookup(process.argv[4])).address
    );
    writeBuffer(list.getBuffer());
  } else if (process.argv[2] == "add-server") {
    let list = RegionList.fromBuffer(
      new PolusBuffer(fs.readFileSync(regionFile))
    );
    list.addServer(
      process.argv[3],
      (await lookup(process.argv[4])).address,
      parseInt(process.argv[5])
    );
    writeBuffer(list.getBuffer());
  }
})();
