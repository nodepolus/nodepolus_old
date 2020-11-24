import test from "ava";

import { EndGame, EndReason } from "../../../lib/packets/subpackets/endGame";
import { PolusBuffer } from "../../../lib/util/polusBuffer";
import { Room } from "../../../lib/util/room";

const room = new Room();

test("endGame should serialize packet", (t) => {
  for (const endReason in EndReason) {
    // TODO: this is a bit hacky, how can we fix?
    if (!isNaN(parseInt(endReason))) continue;
    const v = (EndReason[endReason] as unknown) as number;

    const data = EndGame.serialize(
      {
        type: "EndGame",
        RoomCode: "QQQQQQ",
        EndReason: v,
        ShowAdvert: false,
      },
      room
    );

    t.deepEqual(data.buf, Buffer.from([0x00, 0x00, 0x00, 0x80, v, 0x00]));
  }
});

test("endGame should parse packet", (t) => {
  const buf = new PolusBuffer("A33EE49B0501", true);
  const parsed = EndGame.parse(buf, room);

  t.deepEqual(parsed, {
    type: "EndGame",
    RoomCode: "AAAAAA",
    EndReason: 5,
    ShowAdvert: true,
  });
});
