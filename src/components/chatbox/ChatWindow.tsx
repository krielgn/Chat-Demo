import { useRoomContext } from '@/contexts/RoomContext';
import { useUserContext } from '@/contexts/UserContext';
import { type ChatMessage } from '@/data/logManager';
import { createRef, useEffect, useState, type JSX} from 'react';
import { createUseStyles } from 'react-jss';
import ChatBoxTab from './ChatboxTab';
import ChatInput from './ChatInput';
import type { Room } from '@/types/room';


const styles = createUseStyles({
    chatWindow: {
        width: "50vw",
        maxWidth: "50vw",
    },
    tabContainer: {
        display: 'flex',
        gap: 6,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        maxHeight: "1.5em",
    },
    chatLog: {
        maxHeight: "40vh",
        overflowY: "scroll",
    },
    message: {
        display:'flex',
        justifyContent: 'space-between',
        alignContent: 'start',
        textAlign: 'left',
        wordBreak: 'break-all',
        gap: 5,
    },
    username: {
        color: (props: {color: ColorValueHex}) => `${props.color}`
    },
    time: {
        fontSize: 10,
        color: 'grey',
        minWidth: 52,
        width: '52px !important',
    }
})

export default function ChatWindow(){
    const [chatLog, setChatLog] = useState([]);
    
    const userContext = useUserContext().user;
    const roomContext = useRoomContext();
    const [firstLoad, setFirstLoad] = useState(true);
    const [currentMessage, setCurrentMessage] = useState("");
    const [updateChat, setUpdateChat] = useState(false);
    const [lastRoom, setLastRoom] = useState("");
    const chatLogRef = createRef<HTMLInputElement>();    
    const tabRef = createRef<HTMLDivElement>();    
    
    const css = styles({color: userContext.color});

    function generateChatLog() : JSX.Element[] {
        let log = chatLog.sort((a:ChatMessage, b:ChatMessage)=> a.time - b.time).map((item: ChatMessage) => (
            <div id={`${item.name}-${item.time}`} color={item.color} className={css.message}>
                <span>
                    <span style={{color: item.color}}><b>{item.name} </b></span> 
                    {item.text} 
                </span>
                <span className={css.time}> {new Date(item.time).toLocaleTimeString("en-US")}</span>
            </div>
        ));
        return log;
    }    

    function handleStorageChange(){
        setUpdateChat(true);
    }

    if (updateChat){
        generateChatLog();
    }

    useEffect(()=>{
        // Selected room has been deleted by host, update our selected room to match.
        if (!roomContext.roomIds.includes(roomContext.currentRoom)){
            roomContext.setCurrentRoom("");
            roomContext.currentRoom = "";
        } 

        if (firstLoad || updateChat || lastRoom != roomContext.currentRoom) {
            setLastRoom(roomContext.currentRoom)
            let msgs = [];
            if (roomContext.currentRoom){
                msgs = JSON.parse(sessionStorage.getItem(roomContext.currentRoom) || '{"messages":[]}').messages;
            }
                
            setChatLog(msgs);
            setCurrentMessage("");             
                
            if (updateChat)
                setUpdateChat(false);
            
        }
        if (firstLoad){
            window.addEventListener("storage", handleStorageChange);
            setFirstLoad(false);
        }
        chatLogRef.current!.scrollTop = chatLogRef.current!.scrollHeight;
        return ()=>{
            //window.removeEventListener("storage", handleStorageChange);
        }
        // Update chatlog UI when current room changes or when the chat has been flagged as updating
        }, [roomContext.currentRoom, updateChat, userContext.hostedRoom]);

    return (
        <div className={css.chatWindow}>
            <div className={css.tabContainer} ref={tabRef}>
                {userContext.getAllJoinedRooms().map((x: Room) => 
                    (<ChatBoxTab room={x} hosted={x.roomId == userContext.hostedRoom?.roomId} selected={roomContext.currentRoom==x.roomId}></ChatBoxTab>)
                )}
            </div>
            <hr/>
            <div className={css.chatLog} ref={chatLogRef}>
                {generateChatLog() }
            </div>
            <hr/>
            <ChatInput textInputState={[currentMessage, setCurrentMessage]} currentRoomId={roomContext.currentRoom} setUpdateChat={setUpdateChat}></ChatInput>
        </div>)
    }