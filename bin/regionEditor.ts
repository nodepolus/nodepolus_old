import os from "os";
import fs from "fs";
import { PolusBuffer } from "../lib/util/polusBuffer";
import { RegionList } from "../lib/util/regionList";

let regionFile: string;

if (process.argv[2] == "set-region" && !!process.argv[5]) {
  regionFile = process.argv[5];
} else if (process.argv[2] == "add-server" && !!process.argv[6]) {
  regionFile = process.argv[6];
} else {
  let home = os.homedir();
  let path = home + "/AppData/LocalLow/Innersloth/Among Us/regioninfo.dat";
  if (fs.existsSync(path)) {
    regionFile = path;
  } else {
    throw new Error("regioninfo.dat not found!");
  }
}

function writeBuffer(regionList: PolusBuffer) {
  fs.writeFileSync(regionFile, regionList.buf, "hex");
}

if (process.argv[2] == "set-region") {
  let list = new RegionList(process.argv[3], process.argv[4]);
  writeBuffer(list.getBuffer());
} else if (process.argv[2] == "add-server") {
  let list = RegionList.fromBuffer(
    new PolusBuffer(fs.readFileSync(regionFile))
  );
  list.addServer(process.argv[3], process.argv[4], parseInt(process.argv[5]));
  writeBuffer(list.getBuffer());
}
