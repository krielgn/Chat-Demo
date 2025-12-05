import { RoomContext, RoomDispatchContext } from "@/contexts/RoomContext";
import { useUserContext } from "@/contexts/UserContext";
import { deleteRoomDB, updateRoomListDB } from "@/data/dbReader";
import { useDatabaseFetchSingleRoom } from "@/data/dbReader";
import { Room } from "@/types/room";
import { useContext, type MouseEvent} from "react";
import { createUseStyles, useTheme } from "react-jss";

const styles = createUseStyles({
    roomListItem: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#464447',
        borderRadius: 9,
        alignItems: "center",

        '& label': {
            paddingLeft: 4,
        }
    },
    listItemButton: {
        '& button': {
            width: 86,
        }
    }
});

export default function RoomListItem({roomId}: {roomId: string}){
    const currentUser = useUserContext();
    const roomContext = useContext(RoomContext);
    const roomContextDispatch = useContext(RoomDispatchContext);
    const css = styles({theme: useTheme()});
    
    const handledeleteRoomDB = (evt: MouseEvent<any>, roomId: string) => {
        evt.stopPropagation();
        const rIndex = roomContext.roomIds.findIndex(x => x == roomId);        

        deleteRoomDB(roomId).then(() =>{
            roomContextDispatch({type:"delete", roomId: roomId});
            currentUser.user.unHostRoom();
            
            if (roomContext.currentRoom == roomId){
                roomContext.setCurrentRoom(roomContext.roomIds[rIndex-1] ?? roomContext.roomIds[rIndex+1] ?? "")
            }
        });
    }

    const handleJoinRoom = (evt: MouseEvent<any>, room: Room, join: boolean) => {
        evt.stopPropagation();
        evt.preventDefault();
        const rIndex = roomContext.roomIds.findIndex(x => x == room.roomId);
        const isUserInRoom = room.isJoinedByUser(currentUser.user.userId);
        
        if ((join && !isUserInRoom) || (!join && isUserInRoom)) {
            if (join){        
                currentUser.user.joinRoom(room);
            } else {
                currentUser.user.leaveRoom(room);
            }

            updateRoomListDB(room.roomId, currentUser.user, join);
            currentUser.updateUserRooms(currentUser.user);
            // Update current room, if needed
            if (join){
                if (roomContext.currentRoom == ""){
                    roomContext.setCurrentRoom(room.roomId);
                }        
            } else {            
                if (roomContext.currentRoom == room.roomId){
                    roomContext.setCurrentRoom(roomContext.roomIds[rIndex-1] ?? roomContext.roomIds[rIndex+1] ?? "")
                }
            }
        }
    }

    const roomData = useDatabaseFetchSingleRoom({roomId: roomId});
    if (!roomData) return (<>...</>)

    return (<div>
            <div id={roomData.hostId} className={css.roomListItem}>
                <label>{roomData.name}</label>
                <div className={css.listItemButton}>
                    {roomData.isOwnedByUser(currentUser.user.userId) ? <button onClick={(evt)=>{handledeleteRoomDB(evt, roomData.roomId)}}>Delete</button> : 
                        roomData.isJoinedByUser(currentUser.user.userId) ? <button onClick={(evt)=>{handleJoinRoom(evt, roomData, false)}}>Leave</button> : 
                            <button onClick={(evt)=>{handleJoinRoom(evt, roomData, true)}}>Join</button>}
                </div>
            </div>
        </div>
    );
}