import { Server } from '../lib/server'
import RoomCreationEvent from '../lib/events/RoomCreationEvent';
import JoinRoomRequestEvent from '../lib/events/JoinRoomRequestEvent';
import ConnectionEvent from '../lib/events/ConnectionEvent';
import RoomListingRequestEvent from '../lib/events/RoomListingRequestEvent';
import DisconnectionEvent from '../lib/events/DisconnectionEvent';
// import AnnouncementServer from "../lib/announcements/Server";
// import { FreeWeekendState } from '../lib/announcements/packets/subpackets/FreeWeekend';
// import Text from '../lib/util/Text';

const server = new Server({
  port: 22023
})

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
})

server.on("roomCreated", async (evt:RoomCreationEvent) => {
	console.log("[Event] Server > 'roomCreated'")
})

server.on("joinRoomRequest", async (evt: JoinRoomRequestEvent) => {
	console.log("[Event] Server > 'joinRoomRequest'")
})

server.on("connection", async (evt: ConnectionEvent) => {
	console.log("[Event] Server > 'connection'")
	evt.connection.on('joinRoomRequest', async (evt: JoinRoomRequestEvent) => {
		console.log("[Event] Connection > 'joinRoomRequest'")
	})
	evt.connection.on('disconnection', async (evt: JoinRoomRequestEvent) => {
		console.log("[Event] Connection > 'disconnection'")
	})
	evt.connection.on('joinRoom', async (evt: JoinRoomRequestEvent) => {
		console.log("[Event] Connection > 'joinRoom'")
	})
})

server.on("roomListingRequest", async (evt: RoomListingRequestEvent) => {
	console.log("[Event] Server > 'roomListingRequest'")
})

server.on("disconnection", async (evt: DisconnectionEvent) => {
	console.log("[Event] Server > 'disconnection'")
})

server.listen();
// annServer.listen();
