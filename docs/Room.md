# Events
## publicityChange(PublicityChangeEvent)
`publicityChange` is emitted when the host attemps to change the publicity state but before forwarding it to the rest of the connections. `PublicityChangeEvent` will follow the following format, and extends CancelableEvent:
```ts
{
	"oldPublicity": Publicity,
	"newPublicity": Publicity
}
```

When this event is canceled, the room will stick to it's current publicity and the server will send a packet back to the host notifying it to change back to the old publicity
## settingsChange(SettingsChangeEvent)
`settingsChange` is emitted when the host attempts to change the settings of the room but before forwarding it to the rest of the connections. `SettingsChangeEvent` will follow the following format, and extends CancelableEvent:
```ts
{
	"oldSettings": RoomSettings,
	"newSettings": RoomSettings
}
```

when this event is canceled, the room will stick to it's current settings and the server will send a packet back to the host notifying it to change back to the old settings
## connection(ConnectionEvent)
`connection` is emitted when a connection gets moved to this room. ConnectionEvent will extend a Connection and implement a cancelable event

when this event is canceled, the connection will be disconnected and not join the room.
## chat(ChatEvent)
`chat` is emitted when a chat message is sent ingame. `ChatEvent` will follow the following format, and extends CancelableEvent
```ts
{
	"author": Connection,
	"message": string
}
```
## chatNote(ChatNoteEvent)
`chatNote` is emitted when a vote message is sent in the meeting chat.
## destroyed(RoomDestructionEvent)
destroyed is emitted just after the last connection leaves a room. RoomDestructionEvent will extend Room and implement CancelableEvent

When this event is canceled, the room will not be destroyed, and future players will be able to join it with it's room code.
## gameStart(GameStartEvent)
## hostSwitched(HostSwitchEvent)
# Properties
## `Connection[]` connections

## *get* `String` code
 Game code
## *get* `RoomSettings` settings
## *set* `RoomSettings` settings'
setting settings will send a SyncSettings packet to all clients
## `Game | undefined` game?
will return a `Game` if currently in a game, `undefined` if not
## `Publicity` publicity
## *get* `Connection` host
will return the connection of the host
# Functions
## close(`reason: string|number|undefined`)
closes the room with a reason. Disconnects every connection.
## syncSettings()
sends a syncSettings packet out with the current settings as defined in room.settings
## setPublicity(`publicity: Publicity`)
sets the room publicity state
