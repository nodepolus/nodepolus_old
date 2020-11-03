import PolusBuffer from "../../../util/PolusBuffer";

export interface DataPacket {

}

export default class Data {

	parse(packet: PolusBuffer): DataPacket {
		return null
	}
	serialize(packet: DataPacket): PolusBuffer {
		return null
	};
};