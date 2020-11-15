import { PacketHandler } from '../../../packets/packet'
import PolusBuffer from '../../../util/polusBuffer'

export enum FreeWeekendState{
    NotFree = 0,
    FreeMIRA = 1,
    Free = 2
}

export interface FreeWeekendPacket{
    type: "FreeWeekend",
    FreeState?: FreeWeekendState
}

export const FreeWeekend: PacketHandler<FreeWeekendPacket> = {
	parse(packet: PolusBuffer): FreeWeekendPacket {
		return {
            type: "FreeWeekend",
            FreeState: packet.readU8()
		};
	},

	serialize(packet: FreeWeekendPacket): PolusBuffer {
        let buf = new PolusBuffer(0);
        if (packet.FreeState)
          buf.writeU8(packet.FreeState);
        return buf;
	}
}
