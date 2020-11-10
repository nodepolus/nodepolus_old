import Component from "../../../../lib/packets/PacketElements/Component"
import { expect } from "chai"
import Server from "../../../../lib/Server"
import Room from "../../../../lib/util/Room"

describe('Component basic coverage', function() {
    it('trivial constructor coverage', function() {
        let comp = new Component(BigInt(0), 3, new Room(new Server))
        expect(comp.index).equals(3)
        comp.room.server.disconnect()
    })
})