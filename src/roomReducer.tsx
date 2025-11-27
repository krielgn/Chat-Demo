export interface RoomAction {
    type: string,
    roomId: string,
    userId?: string
}

export default function roomReducer(rooms: Room[], action: RoomAction): Room[] {
    switch(action.type){
        case 'delete': {
            return rooms.filter((x: Room) => x.roomId !== action.roomId);
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