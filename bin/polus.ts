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

import Text from "../lib/util/text"

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
  room.setCode("POSSUM")
  room.on('playerJoined', async (evt: JoinRoomEvent) => {
    if (evt.player?.connection?.name === "roobscoob") {
      let prefix = new Text()
        .appendColor("BF3F3F99")
        .append("{")
        .appendColor("BF3F3FFF")
        .append("*")
        .appendColor("BF3F3F99")
        .append("} ")
      if(evt.player.connection.isHost) {
        prefix  
          .appendColor("7F3FBF99")
          .append("{")
          .appendColor("7F3FBFFF")
          .append("H")
          .appendColor("7F3FBF99")
          .append("} ")
      }
      evt.player.setName(
        prefix
          // .appendColor("BF3F3FFF")
          // .append("r")
          // .appendColor("BF7F3FFF")
          // .append("o")
          // .appendColor("BFBF3FFF")
          // .append("o")
          // .appendColor("7FBF3FFF")
          // .append("b")
          // .appendColor("3FBF3FFF")
          // .append("s")
          // .appendColor("3FBF7FFF")
          // .append("c")
          // .appendColor("3FBFBFFF")
          // .append("o")
          // .appendColor("3F7FBFFF")
          // .append("o")
          // .appendColor("3F3FBFFF")
          // .append("b")
          .toString()
      )
      return;
    }

    if(evt.player.connection?.isHost) {
      evt.player.setName(
        new Text()
          .appendColor("7F3FBF99")
          .append("{")
          .appendColor("7F3FBFFF")
          .append("H")
          .appendColor("7F3FBF99")
          .append("} ")
          .appendColor("FFFFFFFF")
          .append(evt.player.name)
          .toString()
      )
    }
    
  })
});

server.on("joinRoomRequest", async (evt: JoinRoomRequestEvent) => {
  console.log("[Event] Server > 'joinRoomRequest'");
});

server.on("connection", async (evt: ConnectionEvent) => {
  let connection = evt.connection
  console.log(`[Event] Server > 'connection'[${connection.ID}]`);
  evt.connection.on("joinRoomRequest", async (evt: JoinRoomRequestEvent) => {
    console.log(`[Event] Connection[${connection.ID}] > 'joinRoomRequest'`);
  });
  evt.connection.on("disconnection", async (evt: JoinRoomRequestEvent) => {
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
