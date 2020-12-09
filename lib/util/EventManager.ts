import { ConnectionEvent, DisconnectionEvent, JoinRoomEvent, JoinRoomRequestEvent, RoomCreationEvent, RoomListingRequestEvent } from "../events"
import { Server } from "../server"
import { Room } from "./room"

export type serverEvents = 'listening'|'connection'|'disconnection'|'message'|'roomCreated'|'joinRoomRequest'|'roomListingRequest'
export type roomEvents = 'close'|'playerJoined'
export type events = serverEvents|roomEvents

export class EventManager {
    public events: Map<events, Function[]> = new Map()

    constructor(server: Server) {
        server.on('connection', async (e: ConnectionEvent) => {
            this.emitEvent('connection', e)
        })

        server.on('disconnection', async (e: DisconnectionEvent) => {
            this.emitEvent('disconnection', e)
        })

        server.on('roomCreated', async (e: RoomCreationEvent) => {
            this.emitEvent('roomCreated', e)

            const room = e.room

            room.on('playerJoined', async (e: JoinRoomEvent) => {
                this.emitEvent('playerJoined', e, room)
            })
        })

        server.on('joinRoomRequest', async (e: JoinRoomRequestEvent) => {
            this.emitEvent('joinRoomRequest', e)
        })

        server.on('roomListingRequest', async (e: RoomListingRequestEvent) => {
            this.emitEvent('roomListingRequest', e)
        })
    }

    registerEvent(event: events, handler: Function) {
        if(this.events.has(event)) {
            this.events.get(event)?.push(handler)
        }else {
            this.events.set(event, [handler])
        }
    }

    private emitEvent(event: events, param: any, room?: Room) {
        const params = [param]
        if(room) params.push(room)

        this.events.get(event)?.forEach(handler => {
            handler.call(null, params)
        })
    } 
}