import { MyPeer } from "@/data/peerManager";
import {initRoomLocalStorage} from "@/data/logManager"
import { Room } from "./room";
import Cookies from 'js-cookie'


export interface UserProps {
    userId?: string;
    name?: string;
    color?: ColorValueHex;
    updateUserHook?: (user: User)=>void;
    //hostedRooms?: Peer[];
    //joinedRooms?: MyPeer[];
}

export class User implements UserProps {
    userId: string = "";
    name: string = "";
    color: ColorValueHex = "#777";
    hostedRoom: MyPeer | undefined;
    joinedRooms: MyPeer[] = [];
    updateUserHook?: (user: User)=>void;

    public constructor();
    public constructor(props: UserProps);

    constructor(...arr: any[]) {
        // There will be only one User per instance, saved in state and accessed via UserContext.
        if (arr.length == 0) {
            // Freshly initialized user, i.e.: someone opening the page for the first time.
            [this.userId, this.name, this.color] = this.initUserId();
        } else {
            // After a user 'logs in', their name/color are stored.
            const props: UserProps = arr[0];
            this.setNewUserCookie(props);

            this.userId = props.userId!;
            this.name = props.name!;
            this.color = props.color!;
            if (props.updateUserHook){
                this.updateUserHook = props.updateUserHook;
            }
        }        
    }

    // This is for handling the room array changes in state.
    // We only want to call this from the object itself, to keep things from getting too messy.
    private updateUser() {
        if (this.updateUserHook){
            this.updateUserHook(this);
        }
    }

    private initUserId(){        
        const cookie: any = Cookies.get('user');
        let id = "";
        if (!cookie){
            id = (Math.floor(Math.random() * 9999999999) + 1).toString();
            Cookies.set('user', JSON.stringify({userId: id}), {expires: 7});
            return [id, "", ""];
        } else {
            let cookieData = JSON.parse(cookie);
            return [cookieData.userId, cookieData.name, cookieData.color];
        }
    }

    private setNewUserCookie(props: UserProps){
        const name = props.name!.replace(/\W/g, '');
        Cookies.set('user', JSON.stringify({userId: props.userId, name: name, color: props.color}), {expires: 5});
    }

    isLoggedIn() {
        return (this.userId && this.userId != "") && (this.name && this.name != "");
    }

    // Gets connection data for a given room
    getPeerFromRoomId(roomId: string): MyPeer | null {
        if (this.hostedRoom){
            if (this.hostedRoom.roomId == roomId) {
                return this.hostedRoom;
            }
        }
        const joinedRoom = this.joinedRooms.filter(x => x.roomId == roomId)[0];
        if (joinedRoom) return joinedRoom
        return null;
    }

    getAllJoinedRooms() {
        let out: Room[] = [];
        if (this.hostedRoom) {
            out.push(new Room(this.hostedRoom.roomId!, this.hostedRoom.roomName, this.userId));
        }
        if (this.joinedRooms.length > 0) {
            this.joinedRooms.forEach(x=>{
                out.push(new Room(x.roomId!, x.roomName, x.currentRoomHostId));
            });
        }
        return out;
        
    }
    getAllJoinedRoomIds() {
        let out: string[] = [];
        if (this.hostedRoom) {
            out.push(this.hostedRoom.roomId!);
        }
        if (this.joinedRooms.length > 0) {
            this.joinedRooms.forEach(x=>{
                out.push(x.roomId!);
            });
        }
        return out;
    }

    hostRoom(roomId: string, name: string) {
        this.hostedRoom = new MyPeer(this, roomId, name);
        this.updateUser();
        initRoomLocalStorage(roomId);
    }
    unHostRoom(){
        if (this.hostedRoom) {
            this.hostedRoom.leave();
            this.hostedRoom = undefined;
            this.updateUser();
        }
    }

    joinRoom(room: Room) {
        room.userJoin(this.userId);
        let newConnection = new MyPeer(this, room.roomId, room.name, room.hostId);
        this.joinedRooms.push(newConnection);
        this.updateUser();
        initRoomLocalStorage(room.roomId);
    }
    // When leaving a room manually (via button), inform the room object so the tabs render properly
    leaveRoom(room: Room) {
        room.userLeave(this.userId);   
    }

    // Any disconnected rooms will be noticed here, and removed from joinedRooms.
    pruneDisconnectedRooms(): boolean {
        const cnt = this.joinedRooms.length;
        // Empty roomId means the Peer() has been closed, just needs to be removed here to clear the now unneeded MyPeer() it was attached to.
        this.joinedRooms = this.joinedRooms.filter(x=>{ x.roomId != "";});
        this.updateUser();
        
        // Return true if we found any disconnected rooms
        return cnt != this.joinedRooms.length;
    }
}
