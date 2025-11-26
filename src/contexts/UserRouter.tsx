import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "./UserContext";

const UserRouter = () => {
    const currentUser = useUserContext();
    console.log(currentUser.user);
    if (currentUser?.user.id == -1){
        return (<Navigate to="/"></Navigate>)
    }
    return <Outlet/>;
}

export default UserRouter;