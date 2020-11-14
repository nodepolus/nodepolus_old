import { Server } from '../lib/server'
import AnnouncementServer from "../lib/announcements/Server";
import { FreeWeekendState } from '../lib/announcements/packets/subpackets/FreeWeekend';
import Text from '../lib/util/Text';

const annServer = new AnnouncementServer({
	defaultMessage: new Text("Someone should create")
		.append(" ")
		.appendLink("https://wiki.weewoo.net/wiki/Announcements")
			.append("a Text wiki page")
		.clearState()
		.append("!"),
	port: 22024,
  freeWeekend: FreeWeekendState.NotFree
})

const server = new Server({
  port: 22023
})

process.stdin.on("data", () => {
  	process.exit(1);
})

server.listen()
annServer.listen()
