import {Navigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const UnrequireAuth = ({children}) => {
    const user = useAuth();

    if (user.isAuth)
        return <Navigate to="/"/>

    return children;
}

export {UnrequireAuth}