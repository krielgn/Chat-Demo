import ChatBox from "@/components/Chatbox.tsx"
import Peer from "peerjs";

export default function Chat(){
    const peer = new Peer();

    return(
        <div>
            <p>This is the chat page, not done...</p>
            <ChatBox></ChatBox>
        </div>
    )
}