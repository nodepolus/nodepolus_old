import { Room } from "./room"

export type serverEvents = 'connection'|'disconnection'|'roomCreated'|'joinRoomRequest'|'roomListingRequest'
export type roomEvents = 'playerJoined'|'close'
export type events = serverEvents|roomEvents

export class EventManager {
    public events: Map<events, Function[]> = new Map()

    registerEvent(event: events, handler: Function) {
        if(this.events.has(event)) {
            this.events.get(event)?.push(handler)
        }else {
            this.events.set(event, [handler])
        }
    }

    emitEvent(event: events, param?: any, room?: Room) {
        const params: any[] = []
        if(param) params.push(param)
        if(room) params.push(room)

        this.events.get(event)?.forEach(handler => {
            handler(...params)
        })
    } 
}