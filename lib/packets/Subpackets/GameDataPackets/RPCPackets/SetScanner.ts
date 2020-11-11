import { SubpacketClass } from '../..'
import PolusBuffer from '../../../../util/PolusBuffer'

export interface SetScannerPacket {
	IsScanning: boolean,
	ScannerFrame: number
}

export const SetScanner: SubpacketClass<SetScannerPacket> = {
	parse(packet: PolusBuffer): SetScannerPacket {
		return {
			IsScanning: packet.readBoolean(),
			ScannerFrame: packet.readU8()
		}
  },

	serialize(packet: SetScannerPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeBoolean(packet.IsScanning);
		buf.writeU8(packet.ScannerFrame);
		return buf;
	}
}
