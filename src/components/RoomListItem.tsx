import { type ActionDispatch, type MouseEvent } from "react";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    roomListItem: {
        ':hover': {
            backgroundColor: 'grey',
            color: 'white'
        }
    }
})

interface RoomItemProps {
    room: Room;
    dispatchR: ActionDispatch<any>;
}

export default function RoomListItem({room, dispatchR}: RoomItemProps){
    const classes = styles();
    
    const handleDeleteRoom = (evt: MouseEvent<HTMLButtonElement>) => {
        dispatchR({type:"delete", roomId: ""});
    }

    const handleJoinRoom = (evt: MouseEvent<HTMLButtonElement>) => {
        dispatchR({type:"join", roomId: "", userId: ""});
    }

    const handleLeaveRoom = (evt: MouseEvent<HTMLButtonElement>) => {
        dispatchR({type:"leave", roomId: "", userId: ""});
    }
    
    return (
        <div id={room.hostId} className={classes.roomListItem}>
            {room.name}
            {room.ownedByCurrentUser ? <button onClick={handleDeleteRoom}>Delete</button> : 
                room.joinedByCurrentUser ? <button onClick={handleLeaveRoom}>Leave</button> : 
                    <button onClick={handleJoinRoom}>Join</button>}
        </div>
    );
}