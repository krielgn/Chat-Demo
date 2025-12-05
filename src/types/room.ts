export interface RoomProps {
    name: string;
    hostId: string;
    roomId: string;
    userList?: string[];
}

export class Room implements RoomProps {
    name: string = "";
    hostId: string = "";
    roomId: string = "";
    private _userList: string[] = [];

    public constructor();
    public constructor(roomId: string);
    public constructor(roomId: string, name: string, hostId: string);
    public constructor(roomId: string, name: string, hostId: string, userList: string[]);

    public constructor(...arr: any[]) {
        if(arr[0]){
            this.roomId = arr[0];
        }
        if(arr[1]){
            this.name = arr[1];
        }
        if(arr[2]){
            this.hostId = arr[2];
        }
        if(arr[3]){
            this._userList = arr[3];
        } else {
            this._userList.push(this.hostId);
        }        
    }

    public get userList() {
        return this._userList;
    }

    userJoin(id: string) {
        if (!(this._userList.includes(id))) {
            this._userList.push(id);
        }
    }

    userLeave(id: string) {
        if (this._userList.includes(id)) {
            this._userList = this._userList.filter((x) => x != id);
        }
    }

    isOwnedByUser(id: string){
        return this.hostId == id;
    }

    isJoinedByUser(id: string){
        return this._userList.includes(id);
    }
}