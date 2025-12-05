import { useRoomContext } from "@/contexts/RoomContext";
import { useUserContext } from "@/contexts/UserContext";
import { type ChatMessage, addMessageToRoomStorage } from "@/data/logManager";
import React, { useState } from "react";


interface ChatInputProps{
    setUpdateChat: React.Dispatch<React.SetStateAction<boolean>>,
    currentRoomId: string,
    textInputState: [string, React.Dispatch<React.SetStateAction<string>>]
}


export default function  ChatInput({setUpdateChat, currentRoomId, textInputState} : ChatInputProps){
    const userContext = useUserContext().user;
    const roomContext = useRoomContext();
    const [currentMessage, setMessage] = textInputState

    function submitMessage() {
        if (currentMessage == "") return;
        const messageTemp: ChatMessage = {
            userId: userContext.userId,
            name: userContext.name,
            text: currentMessage,
            color: userContext.color,
            time: Date.now(),
        }
        
        const peer = userContext.getPeerFromRoomId(currentRoomId);
        if (peer){
            peer.send(messageTemp);
            addMessageToRoomStorage(currentRoomId, messageTemp);
            setUpdateChat(true);
        } else {
            console.log("Chatbox.submitMessage() -> Couldn't find peer - something very wrong!!")
        }
    }

    const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(evt.currentTarget.value);
    }    

return(
    <div className='textBar'>
        <input disabled={roomContext.currentRoom == ""} type="text" onKeyUp={(evt)=>{if(evt.key == "Enter") submitMessage()}} 
            onChange={handleTextChange} value={currentMessage} ></input>
            <button disabled={roomContext.currentRoom == ""} onClick={submitMessage}>Send</button>
    </div>
    )

}