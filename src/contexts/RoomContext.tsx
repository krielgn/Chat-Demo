import { fetchRooms } from "@/data/dbReader";
import roomReducer from "@/roomReducer";
import { Room, } from "@/types/room";
import { createContext, type ReactNode, useContext, useEffect, useReducer } from "react";
import { Outlet } from "react-router-dom";

export const RoomContext = createContext<Room[]>([]);
export const RoomDispatchContext = createContext<any>(null);

const RoomContextProvider = () => {
    const [roomList, roomDispatch] = useReducer(roomReducer, []);
    let ignore = false;
    
    useEffect(() => {
        console.log("FETCHING")
        if (!ignore){

            fetchRooms().then((data) => {
                if (data){
                    data.forEach((room: any) => {
                        roomDispatch({type: "add", room: new Room(room.name, room.hostId, room.id)});
                    })
                } else {
                    console.log("Error fetching");
                }
            });
        }
        // Prevents needless refetching
        return () => {
            ignore = true;
        }

        // let rooms = async function fetch(){
        //     let query = await getDocs(collection(db, "rooms"));
        //     let output = query.docs.map((doc) => {
        //         let data = doc.data();
        //         console.log("test1");
        //         roomDispatch({type: "init", room: new Room(data.name, data.hostId, doc.id)});
        //         return "x";
        //     });
        //     return output;
        // }
        // rooms().then().catch((err) => {
        //     console.log("Error initializing: " + err);
        // });        
    }, []);

    return (
        <RoomContext value={roomList}>
            <RoomDispatchContext value={roomDispatch}>
                <Outlet/>
            </RoomDispatchContext>
        </RoomContext>
    );
}
export default RoomContextProvider;

export const useRoomContext = () => {
    return useContext(RoomContext);
};