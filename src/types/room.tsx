export interface RoomProps {
    name: string;
    hostId: string;
    roomId: string;
    userList?: string[];
}

export class Room implements RoomProps {
    name: string;
    hostId: string;
    roomId: string;
    userList: string[] = [];
    
    constructor(name: string, hostId: string, roomId: string){
        this.name = name;
        this.hostId = hostId;
        this.roomId = roomId;
    }

    isOwnedByUser(id: string){
        return this.hostId == id;
    }

    isJoinedByUser(id: string){
        return id in this.userList;
    }
}