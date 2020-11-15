import udp from "udp-proxy";

import { PacketType } from "../lib/packets/packet";

const options = {
  address: "0.0.0.0",
  port: 22022,
  ipv6: false,
  localaddress: "0.0.0.0",
  localport: 22023,
  localipv6: false,
  proxyaddress: "0.0.0.0",
  timeOutTime: 10000,
};

const UDPProxy = udp.createServer(options);

UDPProxy.on("message", function (message: any, senderRaw: any) {
  if (
    message[0] !== PacketType.PingPacket &&
    message[0] !== PacketType.AcknowledgementPacket
  )
    console.log(
      senderRaw.address + ":" + senderRaw.port + " => S",
      message
        .toString("hex")
        .toUpperCase()
        .match(/.{1,2}/g)
        .join(" ")
    );
});

UDPProxy.on("proxyMsg", function (message: any, sender: any, peer: any) {
  if (
    message[0] !== PacketType.PingPacket &&
    message[0] !== PacketType.AcknowledgementPacket
  )
    console.log(
      "S => " + peer.address + ":" + peer.port,
      message
        .toString("hex")
        .toUpperCase()
        .match(/.{1,2}/g)
        .join(" ")
    );
});

/*
0100022b0010002a020a00010000070000803f0000803f0000c03f000070410101020100000000010f00000078000000010f
0100022c0010002a020a00010000070000803f0000803f0000c03f000070410101020100000000010f00000078000000010f
*/
