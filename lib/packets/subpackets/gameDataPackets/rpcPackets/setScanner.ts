import PolusBuffer from '../../../../util/polusBuffer'
import { PacketHandler } from '../../../packet'

export interface SetScannerPacket {
	IsScanning: boolean,
	ScannerFrame: number
}

export const SetScanner: PacketHandler<SetScannerPacket> = {
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
