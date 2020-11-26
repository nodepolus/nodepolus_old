import os from "os";
import fs from "fs";
import { PolusBuffer } from "../lib/util/polusBuffer";

export class regionEditor {
  regionFile: string;

  constructor(regionFile: string) {
    if (!regionFile) {
      let home = os.homedir();
      if (
        fs.existsSync(
          home + "/AppData/LocalLow/Innersloth/Among Us/regioninfo.dat"
        )
      )
        this.regionFile =
          home + "/AppData/LocalLow/Innersloth/Among Us/regioninfo.dat";
      else throw new Error("regioninfo.dat not found!");
    } else {
      this.regionFile = regionFile;
    }
  }

  public writeBuffer(regionList: PolusBuffer) {
    fs.writeFileSync(this.regionFile, regionList.buf, "hex");
  }
}
