import PolusBuffer from "../../util/PolusBuffer";

interface MasterServer {
	Name: string,
	IP: string,
	Port: number,
	PlayerCount: bigint
}

export interface MasterServersPacket {
  type: 'MasterServers',
	MasterServers: MasterServer[]
}

class MasterServers {
	parse(packet: PolusBuffer): MasterServersPacket {
		packet.readU8(); // always 1
		const MasterServerCount = packet.readVarInt();
		const MasterServers: MasterServer[] = new Array<MasterServer>();
		for (let i = 0; i < MasterServerCount; i++) {
			packet.cursor += 3; // length & type
			MasterServers[i] = {
				Name: packet.readString(),
				IP: ([packet.readU8(), packet.readU8(), packet.readU8(), packet.readU8()]).join("."),
				Port: packet.readU16(),
				PlayerCount: packet.readVarInt()
			};
		}
		return {
      type: 'MasterServers',
      MasterServers
    };
	}
	serialize(packet: MasterServersPacket): PolusBuffer {
		var buf = new PolusBuffer();
		buf.writeU8(1);
		buf.writeVarInt(BigInt(packet.MasterServers.length));
		var MSBufs = PolusBuffer.concat(...packet.MasterServers.map(MasterServer => {
			var LengthBuf = new PolusBuffer(3);
			var MSBuf = new PolusBuffer();
			MSBuf.writeString(MasterServer.Name);
			const MSIP = MasterServer.IP.split(".").map(e => parseInt(e));
			MSIP.forEach(int => {
				MSBuf.writeU8(int)
			});
			MSBuf.writeU16(MasterServer.Port);
			MSBuf.writeVarInt(MasterServer.PlayerCount);
			LengthBuf.writeU16(MSBuf.length);
			return PolusBuffer.concat(LengthBuf, MSBuf);
		}))
		return PolusBuffer.concat(buf, MSBufs) ;
	}
}

export default MasterServers;