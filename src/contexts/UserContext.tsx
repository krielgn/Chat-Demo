import { useContext, createContext, useState } from "react";
import Peer from "peerjs";

interface UserProps {
    id?: number;
    name?: string;
    color?: ColorValueHex;
    peer?: Peer | null;
}

export class User implements UserProps {
    id: number;
    name: string;
    color: ColorValueHex;
    peer: Peer | null = null;

    constructor(props : UserProps){
        this.id = props.id || -1;
        this.name = props.name || "";
        this.color = props.color || "#888";
    }

    connectNewUser() : number {        
        if (this.peer != null) {
            return -1;
        }
        
        let userId = '-1';
        this.peer = new Peer(Math.floor(Math.random()*999999).toString(), {
            host: '',
            port: 443,
            path: '/',
            secure: true,
        });

        this.peer.on('open', function(id) {
            userId = id;
            console.log("Connection established");

            
        });
        
        return 0;
    }
}

interface UserContextProps {
    user: User;
    logInAction: (props : UserProps) => void;
}

interface ProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<UserContextProps>({user: new User({}), logInAction: ()=>{}});
const UserContextProvider = ({children}: ProviderProps) => {
    const [user, setUser] = useState(new User({}));
    
    const logInAction = ({id, name, color}: UserProps) =>{
        if (user.id == -1){
            setUser(new User({
                id: id,
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