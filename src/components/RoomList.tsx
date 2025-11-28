import { useUserContext } from "@/contexts/UserContext";
import { createRef, type MouseEvent, useContext } from "react";
import { createUseStyles } from "react-jss";
import Popup from "reactjs-popup";
import RoomListItem from "./RoomListItem";
import {RoomContext, RoomDispatchContext} from "@/contexts/RoomContext";
import { Room } from "@/types/room";

const styles = createUseStyles({
    roomListItem2: {
        ':hover': {
            backgroundColor: 'grey',
            color: 'white'
        }
    }
})

export default function RoomList() {
    const userContext = useUserContext();
    const roomContext = useContext(RoomContext);
    const roomContextDispatch = useContext(RoomDispatchContext);
    const roomCreateRef = createRef<HTMLInputElement>();
    const classes = styles();

    console.log("con")
    //roomContextDispatch({type:"init", room: new Room("hehe", "7676", "uyuuv")})
    //console.log(roomContext)
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
            {roomContext.map((x: Room) => (<RoomListItem room={x} dispatchR={roomContextDispatch}></RoomListItem>))}
        </div>
        <hr/>
        <Popup trigger={<button>My popup</button>} position={"center center"} modal>
            <div>
                <input ref={roomCreateRef} type='text'></input><button onClick={(evt)=> {if (handleCreateRoom(evt)) close();}}>Create Room</button>
            </div>
        </Popup>
    </div>)
}