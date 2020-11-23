import { PolusBuffer } from "../../util/polusBuffer";
import Vec2 from "vec2";

export interface Position2 {
  X: number;
  Y: number;
}

export function lerp(min: number, max: number, value: number): number {
  if (value < 0) {
    value = 0;
  } else if (value > 1) {
    value = 1;
  }

  return min + (max - min) * value;
}

export function unlerp(min: number, max: number, value: number): number {
  var res = (value - min) / (max - min);

  if (res < 0) {
    res = 0;
  } else if (res > 1) {
    res = 1;
  }

  return res;
}

export class Vector3 {
  constructor(public X: number = 0, public Y: number = 0, public Z: number) {}

  parse(buffer: PolusBuffer): Vector3 {
    this.X = lerp(-40, 40, buffer.readU16() / 65535);
    this.Y = lerp(-40, 40, buffer.readU16() / 65535);
    this.Z = lerp(-40, 40, buffer.readU16() / 65535);
    return this;
  }

  serialize(): PolusBuffer {
    var buf = new PolusBuffer(4);
    buf.writeU16(unlerp(-40, 40, this.X) * 65535.0);
    buf.writeU16(unlerp(-40, 40, this.Y) * 65535.0);
    buf.writeU16(unlerp(-40, 40, this.Z) * 65535.0);
    return buf;
  }
}

export class Vector2 extends Vec2 {
  constructor(public x: number = 0, public y: number = 0) {
    super(x, y);
  }

  parse(buffer: PolusBuffer): Vector2 {
    this.x = lerp(-40, 40, buffer.readU16() / 65535);
    this.y = lerp(-40, 40, buffer.readU16() / 65535);
    return this;
  }
  serialize(): PolusBuffer {
    var buf = new PolusBuffer(4);
    buf.writeU16(unlerp(-40, 40, this.x) * 65535.0);
    buf.writeU16(unlerp(-40, 40, this.y) * 65535.0);
    return buf;
  }
}
