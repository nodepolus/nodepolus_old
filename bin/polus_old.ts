Error.stackTraceLimit = 25;

import { Server } from "../lib/server";

import {
  RoomCreationEvent,
  JoinRoomRequestEvent,
  ConnectionEvent,
  RoomListingRequestEvent,
  DisconnectionEvent,
  JoinRoomEvent,
} from "../lib/events";

// import AnnouncementServer from "../lib/announcements/Server";
// import { FreeWeekendState } from '../lib/announcements/packets/subpackets/FreeWeekend';
// import Text from '../lib/util/Text';

const server = new Server({
  port: 22023,
});

// const annServer = new AnnouncementServer({
// 	defaultMessage: new Text("Someone should create")
// 		.append(" ")
// 		.appendLink("https://wiki.weewoo.net/wiki/Announcements")
// 			.append("a Text wiki page")
// 		.clearState()
// 		.append("!"),
// 	port: 22024,
// 	freeWeekend: FreeWeekendState.NotFree
// })

process.stdin.on("data", () => {
  process.exit(1);
});

server.on("roomCreated", async (evt: RoomCreationEvent) => {
  console.log("[Event] Server > 'roomCreated'");
  let room = evt.room
  room.on('playerJoined', async (evt: JoinRoomEvent) => {
    setInterval(() => {
      if(evt.player.connection) {
        evt.player.setName(String(evt.player.connection.name));
      }
    }, 2500)
  })
});

server.on("joinRoomRequest", async (evt: JoinRoomRequestEvent) => {
  console.log("[Event] Server > 'joinRoomRequest'");
});

server.on("connection", async (evt: ConnectionEvent) => {
  let connection = evt.connection;
  console.log(`[Event] Server > 'connection'[${connection.ID}]`);
  evt.connection.on("joinRoomRequest", async (evt: JoinRoomRequestEvent) => {
    console.log(`[Event] Connection[${connection.ID}] > 'joinRoomRequest'`);
  });
  evt.connection.on("disconnection", async (evt: DisconnectionEvent) => {
    console.log(`[Event] Connection[${connection.ID}] > 'disconnection'`);
  });
  evt.connection.on("joinRoom", async (evt: JoinRoomEvent) => {
    console.log(`[Event] Connection[${connection.ID}] > 'joinRoom'`);
    // evt.player.setName("A Name Override")
  });
});

server.on("roomListingRequest", async (evt: RoomListingRequestEvent) => {
  console.log("[Event] Server > 'roomListingRequest'");
});

server.on("disconnection", async (evt: DisconnectionEvent) => {
  console.log("[Event] Server > 'disconnection'");
});

server.listen();
// annServer.listen();
