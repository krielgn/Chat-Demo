import { useUserContext } from "@/contexts/UserContext";
import { createRef, type MouseEvent, useReducer, } from "react";
import { createUseStyles } from "react-jss";
import Popup from "reactjs-popup";
import RoomListItem from "./RoomListItem";
import roomReducer from "@/roomReducer";

const styles = createUseStyles({
    roomListItem2: {
        ':hover': {
            backgroundColor: 'grey',
            color: 'white'
        }
    }
})

export default function RoomList() {
    const [roomList, roomDispatch] = useReducer(roomReducer, []);
    const userContext = useUserContext();
    const roomCreateRef = createRef<HTMLInputElement>();
    const classes = styles();

    const handleCreateRoom = (evt: MouseEvent<HTMLButtonElement>) => {
        let roomName = roomCreateRef.current?.value;
        if (roomName == "") {
            evt.stopPropagation();
            return false;
        }
        //_createNewRoom();
        return true;
    }

    return (<div>
        <div>
            {roomList.map((x: Room) => (<RoomListItem room={x} dispatchR={roomDispatch}></RoomListItem>))}
        </div>
        <hr/>
        <Popup trigger={<button>My popup</button>} position={"center center"} modal>
            <div>
                <input ref={roomCreateRef} type='text'></input><button onClick={(evt)=> {if (handleCreateRoom(evt)) close();}}>Create Room</button>
            </div>
        </Popup>
    </div>)
}