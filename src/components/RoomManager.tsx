import { useUserContext } from "@/contexts/UserContext";
import { createRef, useState, type ChangeEvent, type MouseEvent, type JSX } from "react";
import Popup from "reactjs-popup";
import type { PopupProps } from "reactjs-popup/dist/types";

interface Room {
    name: string;
    hostId: string;
}

export default function RoomManager(){
    const [roomList, setRoomList] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
    const userContext = useUserContext();
    const roomSelectRef = createRef<HTMLSelectElement>();
    const roomCreateRef = createRef<HTMLInputElement>();

    function generateRoomList() : JSX.Element[] {
        let test = roomList.map((item: Room) => (
            <option value={item.hostId}>{item.name}<button>test</button></option>
        ));
        return test;
    }   
    const handleRoomChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        let room = roomList.find((x) => x.hostId == evt.currentTarget.value);
        if (room){
            setSelectedRoom(room);
        }        
    }

    const handleCreateRoom = (evt: MouseEvent<HTMLButtonElement>) => {
        let roomName = roomCreateRef.current?.value;
        if (roomName == ""){
            evt.stopPropagation();
            return false;
        }
        //_createNewRoom();
        return true;
    }

    return (<div>
        <select ref={roomSelectRef} multiple={false} onChange={handleRoomChange} value={selectedRoom?.hostId}>
            {generateRoomList()}
        </select>

        <Popup trigger={<button>My popup</button>} position={"center center"} modal>
            <div>
                <input ref={roomCreateRef} type='text'></input><button onClick={(evt)=> {if (handleCreateRoom(evt)) close();}}>Create Room</button>
            </div>
        </Popup>
    </div>)
}