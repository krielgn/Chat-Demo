import { useState, type JSX, type MouseEvent } from "react";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    roomListItem: {
        ':hover': {
            backgroundColor: 'grey',
            color: 'white'
        }
    }
})

interface RoomListProps {
    room: Room;
}

export default function RoomListItem(props : RoomListProps){
    const classes = styles();
    
    const handleDeleteRoom = (evt: MouseEvent<HTMLButtonElement>) =>{

    }

    const handleJoinRoom = (evt: MouseEvent<HTMLButtonElement>) =>{

    }

    const handleLeaveRoom = (evt: MouseEvent<HTMLButtonElement>) =>{

    }
    
    return (
        <div id={props.room.hostId} className={classes.roomListItem}>
            {props.room.name}
            {props.room.ownedByCurrentUser ? <button onClick={handleDeleteRoom}>Delete</button> : 
                props.room.joinedByCurrentUser ? <button onClick={handleLeaveRoom}>Leave</button> : 
                    <button onClick={handleJoinRoom}>Join</button>}
        </div>
    );
}