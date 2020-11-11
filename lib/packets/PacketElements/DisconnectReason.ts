import Room from "../../util/Room.js";
import PolusBuffer from "../../util/PolusBuffer.js";

enum DisconnectReasons {
	ExitGame = 0,
	GameFull = 1,
	GameStarted = 2,
	GameNotFound = 3,
	IncorrectVersion = 4,
	Banned = 6,
	Kicked = 7,
	Custom = 8,
	InvalidName = 9,
	Hacking = 10,
	Destroy = 16,
	Error = 17,
	IncorrectGame = 18,
	ServerRequest = 19,
	ServerFull = 20,
	IntentionalLeaving = 208,
	FocusLostBackground = 207,
	FocusLost = 209,
	NewConnection = 210
};

export default class DisconnectReason {
	reasonInt: number;
	reason: string;

	constructor(private packet?: PolusBuffer|number, private room?: Room){
		if(packet && packet instanceof PolusBuffer) {
			if(packet.dataRemaining().length > 1) {
				this.reasonInt = packet.readU32();
			} else {
				if(packet.dataRemaining().length != 0) {
					this.reasonInt = packet.readU8();
				}
			}
			if (this.reasonInt == DisconnectReasons.Custom) {
				this.reason = packet.readString();
			}
		} else {
			this.reasonInt = <number>packet
		}
	}
	toString() {
		if(this.room) {
			switch (this.reasonInt) {
				case DisconnectReasons.ServerFull:
					return "The Among Us servers are overloaded.\r\n\r\nSorry! Please try again later!";
				case DisconnectReasons.FocusLost:
					return "You were disconnected because Among Us was suspended by another app.";
				case DisconnectReasons.Banned:
					return "You were banned from " + this.room.code.toString() + ".\r\n\r\nYou cannot rejoin that room.";
				case DisconnectReasons.Hacking:
					return "You were banned for hacking.\r\n\r\nPlease stop.";
				case DisconnectReasons.Kicked:
					return "You were kicked from " + this.room.code.toString() + ".\r\n\r\nYou can rejoin if the room hasn't started.";
				case DisconnectReasons.GameFull:
					return "The game you tried to join is full.\r\n\r\nCheck with the host to see if you can join next round.";
				case DisconnectReasons.GameStarted:
					return "The game you tried to join already started.\r\n\r\nCheck with the host to see if you can join next round.";
				case DisconnectReasons.GameNotFound:
				case DisconnectReasons.IncorrectGame:
					return "Could not find the game you're looking for.";
				case DisconnectReasons.ServerRequest:
					return "The server stopped this game. Possibly due to inactivity.";
				case DisconnectReasons.Error:
					return "You disconnected from the server.\r\nIf this happens often, check your network strength.\r\nThis may also be a server issue.";
				case DisconnectReasons.InvalidName:
					return "Server refused username: " + "!!TODO!!";
				case DisconnectReasons.IncorrectVersion:
					return "You are running an older version of the game.\r\n\r\nPlease update to play with others.";
				default:
					return this.reason;
			}
		} else {
			return this.reason;
		}
	}
	serialize() {
		var buf = new PolusBuffer();
		if(this.reasonInt || this.reasonInt === 0) {
			buf.writeU8(this.reasonInt);
			if(this.reasonInt == 0x08) {
				buf.writeString(this.reason)
			} 
		}
		return buf;
	}
}