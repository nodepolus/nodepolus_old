# Events
## connection(ConnectionEvent)
connection is emitted after the client sends a hello packet. ConnectionEvent will extend Connection and Implement CancelableEvent

When this event is Canceled, the connection will be terminated & destroyed, sending a disconnect packet with the cancel reason if there was one.
## roomCreated(RoomCreationEvent)
roomCreated is emited just after the client requests a new room, and new Room() is called. RoomCreationEvent will extend Room and implement CancelableEvent

When this event is canceled, the room will be destroyed and the client will get sent a disconnect packet with the cancel reason if there was one.

## requestRoomListing(RoomListingRequestEvent)
requestRoomListing is emitted just before sending the room listing to the client. RoomListingRequestEvent follows the following format, and extends CancelableEvent:
```ts
{
	"request": {
		includePrivate: boolean,
		filter: roomSettings
	},
	"response": {
		SkeldRoomCount?: number,
		MiraHQRoomCount?: number,
		PolusRoomCount?: number,
		Rooms: RoomListing[]
	}
}
``` 
canceling a RoomListingEvent will set Rooms to an empty array and delete the three Count properties `SkeldRoomCount`, `MiraHQRoomCount`, and `PolusRoomCount`
## joinRoomRequest(joinRoomRequestEvent)
requestJoinRoom is emitted when a client requests to join a room, before the server checks if the room exists. joinRoomRequestEvent has a string RoomCode with a 4 or 6 letter room code.

cancelling a joinRoomRequestEvent will disconnect the client

# Properties
## rooms
rooms is a Map<\<string\>roomCode, Room>
## connections
connections is a Map <\<string\>ip:port, Connection>
 
# Functions
## constructor(config?)

## listen()
 starts listening on the port defined in the config
## close()
stops listening, and closes all client connections

# Config

## accessibleIP?: string
The IP from which the server is accessible
## accessiblePort?: number
The port from which the server is accessible