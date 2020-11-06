import udp from 'udp-proxy';
const { createServer } = udp;
import Packet, { PacketType } from "../dist/packets/Packet.js";
import Room from "../dist/util/Room.js";
import PolusBuffer from "../dist/util/PolusBuffer.js";
import assert from 'assert';

const options = {
	address: '0.0.0.0',
	port: 22022,
	ipv6: false,
	localaddress: '0.0.0.0',
	localport: 22023,
	localipv6: false,
	proxyaddress: '0.0.0.0',
	timeOutTime: 10000
};

const UDPProxy = createServer(options);

let room = new Room();


UDPProxy.on('message', function (message, senderRaw) {
	if (message[0] != PacketType.PingPacket && message[0] != PacketType.AcknowledgementPacket) console.log(senderRaw.address + ":" + senderRaw.port + " => S", message.toString('hex').toUpperCase().match(/.{1,2}/g).join(" "))
})

UDPProxy.on('proxyMsg', function (message, sender, peer) {
	if (message[0] != PacketType.PingPacket && message[0] != PacketType.AcknowledgementPacket) console.log("S => " + peer.address + ":" + peer.port, message.toString('hex').toUpperCase().match(/.{1,2}/g).join(" "))
})

/*
0100022b0010002a020a00010000070000803f0000803f0000c03f000070410101020100000000010f00000078000000010f
0100022c0010002a020a00010000070000803f0000803f0000c03f000070410101020100000000010f00000078000000010f
*/