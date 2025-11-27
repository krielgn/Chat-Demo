import { useContext, createContext, useState, type ReactNode } from "react";
import Peer from "peerjs";

interface UserProps {
    userId?: number;
    name?: string;
    color?: ColorValueHex;
    hostedRooms?: Peer[];
    joinedRooms?: string[]
}

export class User implements UserProps {
    userId: number;
    name: string;
    color: ColorValueHex;
    hostedRooms: Peer[] = [];

    constructor(props : UserProps){
        this.userId = props.userId || -1;
        this.name = props.name || "";
        this.color = props.color || "#fff";
    }

    // TO DO
    connectNewUser() : string {
        // let peer = this.peer;
        // if (peer != null) {
        //     return '';
        // }
        
        // let userId = '-1';
        // peer = new Peer('', {
        //     host: 'localhost',
        //     port: 9000,
        //     path: '/myApp',
        //     secure: true,
        // });
        // var conn: DataConnection | null = null;
        // peer.on('open', function(id) {
        //     userId = id;
        //     console.log("Connection established: ", id);
        // });
        // peer.on('connection', function(c) {
        //     if (conn && conn.open){
        //         c.on('open', function(){
        //             c.send("Already connected");
        //             setTimeout(function() {c.close();}, 500);
        //         });
        //     }
        //     conn = c
        //     console.log("Connected to: " + conn.peer);
            
        // });
        // peer.on('disconnected', function(){
        //     peer.reconnect();
        // });
        // peer.on('close', function(){
            
        // });
        // peer.on('error', function(error){
        //     console.log(error);
        // });
        
        return ""// userId;
    }
}

interface UserContextProps {
    user: User;
    logInAction: (props : UserProps) => void;
}

const UserContext = createContext<UserContextProps>({user: new User({}), logInAction: ()=>{}});
const UserContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState(new User({}));
    
    const logInAction = ({userId, name, color}: UserProps) =>{
        if (user.userId == -1){
            setUser(new User({
                userId: userId,
                name: name,
                color: color
            }));
        }        
    }

    return (
        <UserContext value={{user, logInAction}}>
            {children}
        </UserContext>
    );
}
export default UserContextProvider;

export const useUserContext = () => {
    return useContext(UserContext);
};