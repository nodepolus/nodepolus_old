import { createServer } from 'udp-proxy';
import Packet, { PacketType } from "../dist/packets/Packet.js";
import Room from "../dist/util/Room.js";
import PolusBuffer from "../dist/util/PolusBuffer.js";
import assert from 'assert/strict';

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
	if(message[0] != PacketType.PingPacket && message[0] != PacketType.AcknowledgementPacket) console.log("C => S", message.toString('hex').toUpperCase().match(/.{1,2}/g).join(" "))
	var pkt = new Packet(room, true);
	var parsed = pkt.parse(new PolusBuffer(message));
	console.log(parsed);
	console.log(" ");
	var cerealPkt = new Packet(room, true);
	var cereal = cerealPkt.serialize(parsed);
	assert.equal(cereal.buf.toString('hex'), message.toString('hex'))
})

UDPProxy.on('proxyMsg', function (message, sender, peer) {
	if (message[0] != PacketType.PingPacket && message[0] != PacketType.AcknowledgementPacket) console.log("S => C", message.toString('hex').toUpperCase().match(/.{1,2}/g).join(" "))
	var pkt = new Packet(room, false);
	var parsed = pkt.parse(new PolusBuffer(message));
	console.log(parsed);
	console.log(" ");
	var cerealPkt = new Packet(room, false);
	var cereal = cerealPkt.serialize(parsed);
	assert.equal(cereal.buf.toString('hex'), message.toString('hex'))
	handlePacket(parsed, senderRaw)
})

/*
0100022b0010002a020a00010000070000803f0000803f0000c03f000070410101020100000000010f00000078000000010f
0100022c0010002a020a00010000070000803f0000803f0000c03f000070410101020100000000010f00000078000000010f
*/