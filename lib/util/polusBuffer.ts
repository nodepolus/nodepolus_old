/**
 * Core buffer type for reading and writing messages
 */
type BuildFrom = number | Buffer | string | number[];
export class PolusBuffer {
  cursor: number;
  buf: Buffer;
  constructor(buildFrom: BuildFrom = 0, isHex?: boolean) {
    this.cursor = 0;
    if (typeof buildFrom != "number") {
      if (typeof buildFrom === "string" && isHex) {
        this.buf = Buffer.from(buildFrom, "hex");
      } else {
        this.buf = Buffer.from(buildFrom);
      }
    } else {
      this.buf = Buffer.alloc(buildFrom);
    }
  }

  private resizeBuffer(addsize: number): void {
    let newlen = this.cursor + addsize;
    if (this.buf.length < this.cursor + addsize) {
      newlen = newlen - this.buf.length + this.cursor;
    }
    const newb = Buffer.alloc(newlen);
    this.buf.copy(newb);
    this.buf = newb;
  }

  readBoolean(): boolean {
    return this.readU8() != 0x00;
  }

  readU8(): number {
    return this.buf[this.cursor++];
  }

  readU16(isBigEndian: boolean = false): number {
    const uint16 = this.buf[isBigEndian ? "readUInt16BE" : "readUInt16LE"](
      this.cursor
    );
    this.cursor += 2;
    return uint16;
  }

  readU32(isBigEndian = false): number {
    let uint32 = this.buf[isBigEndian ? "readUInt32BE" : "readUInt32LE"](
      this.cursor
    );
    this.cursor += 4;
    return uint32;
  }

  read8(): number {
    return this.buf.readInt8(this.cursor++);
  }

  read16(isBigEndian = false): number {
    const int16 = this.buf[isBigEndian ? "readInt16BE" : "readInt16LE"](
      this.cursor
    );
    this.cursor += 2;
    return int16;
  }

  read32(isBigEndian = false): number {
    const int32 = this.buf[isBigEndian ? "readInt32BE" : "readInt32LE"](
      this.cursor
    );
    this.cursor += 4;
    return int32;
  }

  readFloat32(isBigEndian = false): number {
    const float32 = this.buf[isBigEndian ? "readFloatBE" : "readFloatLE"](
      this.cursor
    );
    this.cursor += 4;
    return float32;
  }

  readVarInt(): number {
    let readMore: boolean = true;
    let shift: number = 0;
    let output: number = 0;
    while (readMore) {
      let b = this.buf.readUInt8(this.cursor++);
      if (b >= 0x80) {
        readMore = true;
        b ^= 0x80;
      } else {
        readMore = false;
      }

      output |= b << shift;
      shift += 7;
    }

    return output;
  }

  readVarUInt(): number {
    return this.readVarInt() >>> 0;
  }

  readString(): string {
    const length = this.readVarInt();
    return this.readBytes(Number(length)).buf.toString("utf8");
  }

  readBytes(length: number): PolusBuffer {
    const buffer = new PolusBuffer(
      this.buf.slice(this.cursor, this.cursor + length)
    );
    this.cursor += length;
    return buffer;
  }

  writeBoolean(value: boolean) {
    this.writeU8(value ? 1 : 0);
  }

  writeU8(value: number) {
    this.resizeBuffer(1);
    if (value > 255 || value < 0) {
      return new RangeError(
        "Value " + value + " outside of UInt8 Range [0 - 255]"
      );
    }
    this.buf[this.cursor++] = value;
  }

  writeU16(value: number, isBigEndian: boolean = false) {
    this.resizeBuffer(2);
    if (value > 65535 || value < 0) {
      return new RangeError(
        "Value " + value + " outside of UInt16 Range [0 - 65535]"
      );
    }
    if (isBigEndian) {
      this.buf.writeUInt16BE(value, this.cursor);
    } else {
      this.buf.writeUInt16LE(value, this.cursor);
    }
    this.cursor += 2;
  }

  writeU32(value: number, isBigEndian: boolean = false) {
    this.resizeBuffer(4);
    if (value > 4294967295 || value < 0) {
      return new RangeError(
        "Value " + value + " outside of UInt8 Range [0 - 4294967295]"
      );
    }
    if (isBigEndian) {
      this.buf.writeUInt32BE(value, this.cursor);
    } else {
      this.buf.writeUInt32LE(value, this.cursor);
    }
    this.cursor += 4;
  }

  write8(value: number) {
    this.resizeBuffer(1);
    if (value > 127 || value < -128) {
      return new RangeError(
        "Value " + value + " outside of UInt8 Range [-128 - 127]"
      );
    }
    this.buf.writeInt8(value, this.cursor++);
  }

  write16(value: number, isBigEndian: boolean = false) {
    this.resizeBuffer(2);
    if (value > 32767 || value < -32768) {
      return new RangeError(
        "Value " + value + " outside of UInt16 Range [-32768 - 32767]"
      );
    }
    if (isBigEndian) {
      this.buf.writeInt16BE(value, this.cursor);
    } else {
      this.buf.writeInt16LE(value, this.cursor);
    }
    this.cursor += 2;
  }

  write32(value: number, isBigEndian: boolean = false) {
    this.resizeBuffer(4);
    if (value > 2147483647 || value < -2147483648) {
      return new RangeError(
        "Value " + value + " outside of UInt8 Range [-2147483648 - 2147483647]"
      );
    }
    if (isBigEndian) {
      this.buf.writeInt32BE(value, this.cursor);
    } else {
      this.buf.writeInt32LE(value, this.cursor);
    }
    this.cursor += 4;
  }

  writeFloat32(value: number, isBigEndian = false) {
    this.resizeBuffer(4);
    let temp;
    if (isBigEndian) {
      temp = this.buf.writeFloatLE(value, this.cursor);
    } else {
      temp = this.buf.writeFloatLE(value, this.cursor);
    }
    this.cursor += 4;
    return temp;
  }

  writeVarInt(value: number) {
    this.writeVarUInt(value >>> 0);
  }

  writeVarUInt(value: number) {
    do {
      let b = value & 0xff;
      if (value >= 0x80) {
        b |= 0x80;
      }
      this.resizeBuffer(1);
      this.buf.writeUInt8(b, this.cursor++);
      value >>>= 7;
    } while (value != 0);
  }

  writeString(value: string) {
    let bytes = Buffer.from(value);
    this.writeVarInt(bytes.length);
    this.writeBytes(bytes);
  }

  writeBytes(bytes: Buffer | Number[] | String | PolusBuffer) {
    if (bytes instanceof PolusBuffer) {
      bytes = bytes.buf;
    }
    this.resizeBuffer(bytes.length);
    const b = Buffer.from(bytes);
    b.copy(this.buf, this.cursor);
    this.cursor += b.length;
  }
  dataRemaining(): Buffer {
    return this.buf.slice(this.cursor);
  }
  static concat(...PolusBuffers: PolusBuffer[]) {
    return new PolusBuffer(Buffer.concat(PolusBuffers.map((PB) => PB.buf)));
  }
  get length(): number {
    return this.buf.length;
  }
}
