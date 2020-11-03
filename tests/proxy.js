'use strict';

var proxy = require('udp-proxy');
var Packet = require("../lib/packets/Packet")
var Room = require("../lib/util/Room")
var PolusBuffer = require("../lib/util/PolusBuffer")

var options = {
	address: '0.0.0.0',
	port: 22022,
	ipv6: false,
	localaddress: '0.0.0.0',
	localport: 22023,
	localipv6: false,
	proxyaddress: '0.0.0.0',
	timeOutTime: 10000
};

var UDPProxy = proxy.createServer(options);

var room = new Room();

UDPProxy.on('message', function (message, senderRaw) {
	var pkt = new Packet(room, true)
	var parsed = pkt.parse(new PolusBuffer(message))
	console.log("C => S")
	console.log(parsed)
	console.log(" ")
})

UDPProxy.on('proxyMsg', function (message, sender, peer) {
	var pkt = new Packet(room, false)
	var parsed = pkt.parse(new PolusBuffer(message))
	console.log("S => C")
	console.log(parsed)
	console.log(" ")
})