export interface DeconStateByteInterface {
	Idle: boolean,
	Enter: boolean,
	Closed: boolean,
    Exit: boolean,
    HeadingUp: boolean
}

class DeconStateByte {
	public static parse(byte: number): DeconStateByteInterface {
		return {
			Idle: byte == 0,
			Enter: (byte & 0x01) != 0,
			Closed: (byte & 0x02) != 0,
			Exit: (byte & 0x04) != 0,
			HeadingUp: (byte & 0x08) != 0
		}
	}
	public static serialize(data: DeconStateByteInterface) {
        var returnInt = 0;

        if (!data.Idle) {
            returnInt |= (data.Enter ? 1 : 0)
            returnInt |= (data.Closed ? 1 << 1 : 0)
            returnInt |= (data.Exit ? 1 << 2 : 0)
            returnInt |= (data.HeadingUp ? 1 << 3 : 0)
        }

		return returnInt;
    }
}

export default DeconStateByte;
