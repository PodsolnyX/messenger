import {useContext} from "react";
import {AuthContext} from "../hocs/authProvider";

export function useAuth() {
    return useContext(AuthContext);
}