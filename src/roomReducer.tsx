import type { Room } from "./types/room";

export interface RoomAction {
    type: "add" | "delete" | "join" | "leave",
    room?: Room,
    userId?: string
}

export default function roomReducer(rooms: Room[], action: RoomAction): Room[] {
    switch(action.type){
        case 'add': {
            console.log("setting data")
            if (action.room){
                return [...rooms, action.room];
            }
            return rooms;
        }
        case 'delete': {
            return rooms.filter((x: Room) => x.roomId !== action.room?.roomId);
        }
        case 'join': {
            return [
                //TO DO
                ...rooms
            ]
        }
        case 'leave': {
            return [
                //TO DO
                ...rooms
            ]
        }
        default: {
            console.log("Invalid action: " + action.type);
            return rooms;
        }
    }
}