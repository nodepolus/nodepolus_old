import Server from '../lib/server'
import AnnouncementServer from "../lib/announcements/Server";
import { FreeWeekendState } from '../lib/announcements/packets/subpackets/FreeWeekend';
import Text from '../lib/util/Text';

const server = new Server();
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

process.stdin.on("data", () => {
  	process.exit(1);
})

server.listen(22023);
annServer.listen();
