import { useRoomContext } from "@/contexts/RoomContext";
import type { Room } from "@/types/room";
import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    tab: {
        backgroundColor: '#464447',
        borderRadius: '8px 8px 0px 0px',
        paddingLeft: 6,
        paddingRight: 6,
        fontWeight: 'bold',
        textOverflow: 'ellipsis',
        overflow: "hidden",
        '&:hover': {
            backgroundColor: 'grey',
            cursor: 'pointer',
        },
        '&.selected': {
            backgroundColor: '#442553ff',
            '&:hover': {
                backgroundColor: '#442553ff',
                cursor: 'auto',
            },
        },
        '&.hosted':{
            fontStyle: 'italic',
        }
    },    
})

interface ChatBoxTabProps {
    room: Room;
    selected: boolean;
    hosted?: boolean;
}

export default function ChatBoxTab({room, selected, hosted=false}: ChatBoxTabProps){
    const css = styles();
    const [unread, setUnread] = useState(false);
    const roomContext = useRoomContext();
    
    const handleRoomSelect = () => {
        setUnread(false);
        roomContext.setCurrentRoom(room.roomId)
    }
    const handleNewMessage = (e:any) => {
        if (e.detail == room.roomId && !selected){
            setUnread(true);
        }
    }

    useEffect(() => {
        // Catch event for unread notification
        window.addEventListener("newMessage", handleNewMessage);

        return ()=>{
            window.removeEventListener("newMessage", handleNewMessage);
        }
    }, [roomContext.currentRoom]);

    return (
        <div className={[css.tab, (selected ? 'selected' : ''), (hosted ? 'hosted' : '')].join(' ')} 
            onClick={() => handleRoomSelect()} title={room.name}>
                {room.name}
                {(unread && !selected) ? <i style={{color:'yellow'}}> (!) </i> : <></>}
        </div>
    )
}


