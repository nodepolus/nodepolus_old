import PolusBuffer from '../../util/PolusBuffer'

export interface Position {
	X: number,
	Y: number
}

export default class Vector2 {
  X: number
  Y: number

	constructor(X: number = -1, Y: number = -1) {
    this.X = X
    this.Y = Y
  }

  parse(buffer: PolusBuffer): Vector2 {
		this.X = this.lerp(-40, 40, (buffer.readU16() / 65535));
		this.Y = this.lerp(-40, 40, (buffer.readU16() / 65535));
		return this;
	}
	serialize():PolusBuffer {
		var buf = new PolusBuffer(4);
		buf.writeU16(this.unlerp(-40, 40, this.X) * 65535.0);
		buf.writeU16(this.unlerp(-40, 40, this.Y) * 65535.0);
		return buf;
	}
	private lerp(min: number, max: number, value: number):number {
		if (value < 0) {
			value = 0;
		} else if (value > 1) {
			value = 1;
		}

		return min + (max - min) * value;
	}
	private unlerp(min: number, max: number, value: number):number {
		var res = (value - min) / (max - min);

		if (res < 0) {
			res = 0;
		} else if (res > 1) {
			res = 1;
		}

		return res;
	}
};

