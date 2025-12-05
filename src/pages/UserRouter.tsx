import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext";

export default function UserRouter() {
    const currentUser = useUserContext().user;
    // Page generates (or fetches from Cookie) a userId on page load (See UserContext.tsx).
    // This cookie will hold the other user data when it is set... but if the current user ONLY 
    //  has an ID, that is a user that hasn't logged in yet.
    if (!currentUser.name || currentUser.name == ""){
        // Not logged in!
        return (<Navigate to="/"></Navigate>)
    }
    return <Outlet/>;
}