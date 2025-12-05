import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, arrayUnion, arrayRemove} from "firebase/firestore";
import { fs } from './firebase.ts'
import { Room } from "@/types/room.ts";
import { useEffect, useState } from "react";
import type { User } from "@/types/user.ts";
import { useUserContext } from "@/contexts/UserContext.tsx";

export async function addRoomToDB(roomName: string, host: User): Promise<Room | null> {
    let newRoom = await addDoc(collection(fs, "rooms"), {
        hostId: host.userId,
        name: roomName,
        userList: [host.userId]
    }).then((resp) => {
        let r = new Room(resp.id, roomName, host.userId);
        console.log(r)
        host.hostRoom(resp.id, roomName);
        return r;
    }).catch((error) => {
        console.log("Error in addRoomToDB: " + error);
        return null;
    });
    return newRoom;
}

export async function deleteRoomDB(roomId: string) {
    let output = await deleteDoc(doc(fs, "rooms", roomId)).then(() =>{
        return {status: "ok"};
    }).catch((error) => {
        console.log("Error in deleteRoomDB: " + error);
        return {status: "error", message: "error"};
    });
    return output.status;
}

export async function updateRoomListDB(roomId: string, user: User, isJoining: boolean){   
    //DB change
    let output = updateDoc(doc(fs, "rooms", roomId), {
        userList: (isJoining ? arrayUnion(user.userId) : arrayRemove(user.userId))
    }).then(()=>{

    });
    return output;
}

type DBUpdateOptions = {
    roomId: string;
    enabled?: boolean;    
}

// Fetch individual room for roomList components
export function useDatabaseFetchSingleRoom({roomId, enabled = true}: DBUpdateOptions){
    const [data, setData] = useState<Room | null>(null);
    const user = useUserContext();
    
    useEffect(()=>{
        if (!enabled){
            return;
        }

        const off = onSnapshot(doc(fs, "rooms", roomId), (doc) => {
            const data = doc.data();
            let r = (data ? new Room(roomId, data.name, data.hostId, data.userList) : null);
            // if doc is null, call delete so the user context gets updated
            if (r == null) {
                user.user.leaveRoomArray(roomId)
            }
            setData(r);
        });
        
        return () => off();
    }, [roomId, enabled]);

    return data
}

// Fetch all database rooms for room context
export function useDatabaseFetchAllRooms(roomListInitializer: (x:string[])=>void) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const userContext = useUserContext()
    let init = false;

    useEffect(()=>{
        setIsLoading(true);
        const q = query(collection(fs, "rooms"));
        const off = onSnapshot(q, (querySnapshot) =>{
            const roomIds: string[] = [];
            querySnapshot.forEach((doc) => {
                roomIds.push(doc.id);
            });
            if (init){
                userContext.updateUserRooms(userContext.user)
            }
            roomListInitializer(roomIds);
            setIsLoading(false);
        });       
        
        return () => off();
    }, []);

    return {isLoading}
}