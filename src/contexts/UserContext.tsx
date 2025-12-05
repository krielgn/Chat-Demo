import { deleteRoomDB, updateRoomListDB } from "@/data/dbReader";
import { User, type UserProps } from "@/types/user";
import { useContext, createContext, useState, type ReactNode, useEffect } from "react";

interface UserContextProps {
    user: User;
    logInAction: (props : UserProps) => void;
    updateUserRooms: (user : User) => void;
}

const UserContext = createContext<UserContextProps>({user: new User(), logInAction: ()=>{}, updateUserRooms: ()=>{}});
const UserContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState(new User());
    
    const logInAction = ({userId, name, color}: UserProps) =>{
        setUser(new User({
            userId: user.userId,
            name: name,
            color: color,
            updateUserHook: updateUserRooms,
        }));
    }

    // The only thing expected to regularly change in the User state is its room lists.
    const updateUserRooms = (userDetails: User) => {
        const newUser = userDetails;
        // Update our current object immediately
        user.hostedRoom = userDetails.hostedRoom;
        user.joinedRooms = userDetails.joinedRooms;
        setUser(newUser);
    }

    useEffect(() => {
        const onBeforeUnload = () => {
            // When we leave the site or close a tab, clear the room from the database.
            if (user.hostedRoom){
                console.log("un...");
                deleteRoomDB(user.hostedRoom.roomId || "");
                console.log("loaded");
                // Null return clears a room on tab close
                return null;
            }
            if (user.joinedRooms.length > 0){            
                user.joinedRooms.forEach(x => {
                    updateRoomListDB(x.roomId!, user, false);
                });
            }
        }
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
        }
    })

    return (
        <UserContext value={{user, logInAction, updateUserRooms}}>
            {children}
        </UserContext>
    );
}
export default UserContextProvider;

export const useUserContext = () => {
    return useContext(UserContext);
};