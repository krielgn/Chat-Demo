import { useUserContext } from "@/contexts/UserContext";
import { createRef, type MouseEvent, useContext, useState} from "react";
import { createUseStyles } from "react-jss";
import Popup from "reactjs-popup";
import RoomListItem from "./RoomListItem";
import {RoomContext} from "@/contexts/RoomContext";
import { addRoomToDB } from "@/data/dbReader";

const styles = createUseStyles({
    roomList: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: 4,
        width: 250,
        maxHeight: "40vh",
    },
    popup: {
        alignItems: 'center',
        display:"flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#242424',

        colorScheme: 'light dark',
        borderRadius: 6,        
        outline: 'black',

        height: '3.5em',
        width:'19em',
    },
    close: {
        cursor: 'pointer',
        position: 'absolute',  
        display: 'block', 
        padding: '2px 5px',
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: '1em',
        right: -10,
        top: -12,  
        fontSize: 16,
        
        borderRadius: 18,
        border: '1px solid #cfcece'
    }
})

export default function RoomList() {
    const userContext = useUserContext();
    const roomContext = useContext(RoomContext);
    const roomCreateRef = createRef<HTMLInputElement>();
    const [openPopup, setOpenPopup] = useState(false)
    const css = styles();

    const handleCreateRoom = (evt: MouseEvent<HTMLButtonElement>) => {
        let roomName = roomCreateRef.current?.value || "";
        if (roomName == "") {
            evt.stopPropagation();
            return false;
        }

        addRoomToDB(roomName, userContext.user).then((room) => {
            if (room){
                userContext.updateUserRooms(userContext.user);
                roomContext.setCurrentRoom(room.roomId);
            }
        });      

        setOpenPopup(!openPopup);
    }    
    
    return (<div>
        <div className={css.roomList}>
            {roomContext.roomIds.map((x: string) => (<RoomListItem roomId={x}></RoomListItem>))}
        </div>
        <hr/>
        <button  disabled={userContext.user.hostedRoom ? true : false} 
            onClick={() => {setOpenPopup(!openPopup)}}>Create Room</button>

        <Popup open={openPopup} position={"center center"} overlayStyle={{backgroundColor: "#80808054"}} modal>
            <button className={css.close} onClick={() => {setOpenPopup(!openPopup)}}>&times;</button>
            <div className={css.popup} >
                <input ref={roomCreateRef} type='text'></input>                
                <button onClick={(evt)=> {handleCreateRoom(evt);}}>Create Room</button>
            </div>
        </Popup>
    </div>)
}
