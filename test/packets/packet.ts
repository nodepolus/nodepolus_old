import test from "ava";

import Packet, { PacketType } from "../../lib/packets/packet";
import { SetGameCodePacket } from "../../lib/packets/subpackets/setGameCode";
import { UnreliablePacket } from "../../lib/packets/unreliablePacket";
import PolusBuffer from "../../lib/util/polusBuffer";
import { Room } from "../../lib/util/room";

test("correctly parses a packet", (t) => {
  const d = new PolusBuffer(
    "0100022b00002a020a01000000000000803f0000803f0000c03f000034420101020100000001010f00000078000000010f",
    true
  );

  const parsed = new Packet(false).parse(d, new Room());

  t.deepEqual(parsed.Reliable, true);
  t.deepEqual(parsed.Type, PacketType.ReliablePacket);
  const unreliablePacket = parsed.Data as UnreliablePacket;
  t.deepEqual(unreliablePacket.Packets.length, 1);

  t.true(unreliablePacket.Packets[0].type === "SetGameCode");
  const setGameCodePacket = unreliablePacket.Packets[0] as SetGameCodePacket;
  t.deepEqual(setGameCodePacket.RoomCode, "EBVTAQ");
});
