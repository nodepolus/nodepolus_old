import test from "ava";

import { Packet, PacketType } from "../../lib/packets/packet";
import { RoomSettings } from "../../lib/packets/packetElements/roomSettings";
import { GameCreatePacket } from "../../lib/packets/subpackets/gameCreate";
import { UnreliablePacket } from "../../lib/packets/unreliablePacket";
import { PolusBuffer } from "../../lib/util/polusBuffer";
import { Room } from "../../lib/util/room";

test("correctly parses a packet", (t) => {
  const d = new PolusBuffer(
    "0100022b00002a020a01000000000000803f0000803f0000c03f000034420101020100000001010f00000078000000010f",
    true
  );

  const room = new Room();
  const parsed = new Packet(true).parse(d, room);
  let roomSettings = new RoomSettings(room);

  roomSettings.Length = 42;
  roomSettings.Version = 2;
  roomSettings.MaxPlayers = 10;
  roomSettings.Language = 1;
  roomSettings.Map = 0;
  roomSettings.PlayerSpeedModifier = 1;
  roomSettings.CrewLightModifier = 1;
  roomSettings.ImpostorLightModifier = 1.5;
  roomSettings.KillCooldown = 45;
  roomSettings.CommonTasks = 1;
  roomSettings.LongTasks = 1;
  roomSettings.ShortTasks = 2;
  roomSettings.EmergencyCount = 1;
  roomSettings.ImpostorCount = 1;
  roomSettings.KillDistance = 1;
  roomSettings.DiscussionTime = 15;
  roomSettings.VotingTime = 120;
  roomSettings.isDefault = true;
  roomSettings.EmergencyCooldown = 15;

  t.deepEqual(parsed.Reliable, true);
  t.deepEqual(parsed.Type, PacketType.ReliablePacket);
  const unreliablePacket = parsed.Data as UnreliablePacket;
  t.deepEqual(unreliablePacket.Packets.length, 1);

  t.is(unreliablePacket.Packets[0].type, "GameCreate");
  const gameCreatePacket = unreliablePacket.Packets[0] as GameCreatePacket;
  t.deepEqual(gameCreatePacket.RoomSettings, roomSettings);
});
