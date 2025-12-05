import { roomReducer } from "@/contexts/roomReducer";
import { useDatabaseFetchAllRooms } from "@/data/dbReader";
import { createContext, useContext, useReducer, useState, type Dispatch, type SetStateAction } from "react";
import { Outlet } from "react-router-dom";

interface RoomContextProps {
    roomIds: string[],
    currentRoom: string,
    setCurrentRoom: Dispatch<SetStateAction<string>>
}
export const RoomContext = createContext<RoomContextProps>({
    roomIds: [], 
    currentRoom: "",
    setCurrentRoom: function (value: SetStateAction<string>): void {
        throw new Error("Function not implemented.");
    }
});
export const RoomDispatchContext = createContext<any>(null);

const RoomContextProvider = () => {
    const [roomList, roomDispatch] = useReducer(roomReducer, []);
    const [currentRoom, setCurrentRoom] = useState("");

    const roomListInitializer = (ids: string[]) => roomDispatch({type: "init", roomIdList: ids});
    useDatabaseFetchAllRooms(roomListInitializer);

    return (
        <RoomContext value={{roomIds: roomList, currentRoom, setCurrentRoom}}>
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