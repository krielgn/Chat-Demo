export interface RoomAction {
    type: "add" | "delete" | "init",
    roomId?: string,
    roomIdList?: string[],
}

// Handles the roomList Context. See RoomContext.tsx
export function roomReducer(roomIds: string[], action: RoomAction): string[] {
    switch(action.type){
        case 'add': {
            return (action.roomId ? [...roomIds, action.roomId] : roomIds)
        }
        case 'delete': {
            return roomIds.filter((x: string) => x !== action.roomId);
        }
        case 'init': {
            return (action.roomIdList ? action.roomIdList : []);
        }
        default: {
            console.log("Invalid action: " + action.type);
            return roomIds;
        }
    }
}
