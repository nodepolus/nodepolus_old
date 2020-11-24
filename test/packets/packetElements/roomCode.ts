import test from "ava";
import { RoomCode } from "../../../lib/packets/packetElements/roomCode";

test("encodes a v1 code", (t) => {
  t.is(1414743380, RoomCode.encode("TEST"));
  t.is(1414743380, RoomCode.encodeV1("TEST"));
});

test("decodes a v1 code", (t) => {
  t.is("TEST", RoomCode.decode(1414743380));
  t.is("TEST", RoomCode.decodeV1(1414743380));
});

test("encodes a V2 code", (t) => {
  t.is(-1975562029, RoomCode.encode("REDSUS"));
  t.is(-1975562029, RoomCode.encodeV2("REDSUS"));
  t.is(-2147483648, RoomCode.encode("QQQQQQ"));
  t.is(-2147483648, RoomCode.encodeV2("QQQQQQ"));
});

test("decodes a V2 code", (t) => {
  t.is("REDSUS", RoomCode.decode(-1975562029));
  t.is("REDSUS", RoomCode.decodeV2(-1975562029));
  t.is("QQQQQQ", RoomCode.decode(-2147483648));
  t.is("QQQQQQ", RoomCode.decodeV2(-2147483648));
});
