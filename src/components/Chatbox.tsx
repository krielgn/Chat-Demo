import { useUserContext } from '@/contexts/UserContext';
import React, { useState, type JSX} from 'react';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
    username: {
        color: (props: ChatBoxStyleProps) => `${props.color}`
    }
})

interface ChatBoxStyleProps {
    color?: ColorValueHex
}

interface ChatMessage {
    name: string;
    message: string;
    time: number;
    color: string;
}
export default function ChatBox(){
    let testMessage: ChatMessage = {
        name: "Admin",
        message: "No swearing",
        time: 4564567,
        color: "#fff",
    }

    const [chatLog, setChatLog] = useState([testMessage]);
    const [currentMessage, setMessage] = useState("");
    const userContext = useUserContext();
    const msgInputRef = React.createRef<HTMLInputElement>();
    
    function generateChatLog() : JSX.Element[] {
        let test = chatLog.map((item: ChatMessage) => (
            <div id={`${item.name}-${item.time}`} color={item.color}>
                <span style={{color: item.color}}><b>{item.name} </b></span> {item.message} 
                <span style={{fontSize: 10, color: "grey"}}> {new Date(item.time).toLocaleTimeString("en-US")}</span>
            </div>
        ));
        return test;
    }

    const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        _updateInputState(evt.currentTarget.value);
    }

    function _updateInputState(msg: string){
        setMessage(msg);
    }

    function submitMessage() {
        const messageTemp: ChatMessage = {
            name: userContext.user.name,
            message: currentMessage,
            color: userContext.user.color,
            time: Date.now(),
        }
        setChatLog([...chatLog, messageTemp]);
        _updateInputState("");
    }

    return (
        <div className='container'>
            <div>
                <h1>Chat Test</h1>
                <h3>Welcome {userContext.user.name} </h3>
                <hr></hr>
            </div>
            <div className='body'>
                {generateChatLog()}
            </div>
            <hr/>
            <div className='textBar'>
                <input ref={msgInputRef} type="text" onKeyUp={(evt)=>{if(evt.key == "Enter") submitMessage()}} 
                    onChange={handleTextChange} value={currentMessage} ></input>
                <button onClick={submitMessage}>Send</button>
            </div>
        </div>)
    }