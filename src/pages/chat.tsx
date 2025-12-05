import ChatWindow from "@/components/chatbox/ChatWindow";
import RoomList from "@/components/room/RoomList";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
    chatMain: {
        display: 'flex',
        gap: '80px',
        alignItems: 'flex-end',
        height: '50vh'
    }
});

export default function Chat(){
    const css = styles();

    return(<>
        <div className={css.chatMain}>
            <RoomList></RoomList>
            <ChatWindow></ChatWindow>
        </div>
    </>)
}