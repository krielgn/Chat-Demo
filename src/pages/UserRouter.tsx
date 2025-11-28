import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext";

export default function UserRouter() {
    const currentUser = useUserContext();
    if (currentUser?.user.userId == -1){
        return (<Navigate to="/"></Navigate>)
    }
    return <Outlet/>;
}