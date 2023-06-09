import {useLocation, Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const RequireAuth = ({children}) => {

    // const location = useLocation();
    const user = useAuth();

    if (!user.isAuth)
        return <Navigate to="login"/>

    return children;
}

export {RequireAuth}
