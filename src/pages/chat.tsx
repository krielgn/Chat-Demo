import ChatBox from "@/components/Chatbox"
import RoomList from "@/components/RoomList";
import { useRoomContext } from "@/contexts/RoomContext";

export default function Chat(){
    
    
    return(
        <div>
            <p>This is the chat page, not done...</p>
            <RoomList></RoomList>
            <ChatBox></ChatBox>            
        </div>
    )
}