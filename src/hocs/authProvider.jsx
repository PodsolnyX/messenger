import {createContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registerUser} from "../store/reducers/userReducer";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../store/reducers";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {

    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signIn = (userData) => {
        dispatch(loginUser(userData, () => navigate("/")));
    }
    const signUp = (userData) => {
        dispatch(registerUser(userData, () => navigate("/")));
    }
    const signOut = () => {
        dispatch(logoutUser(() => navigate("/login")));
    }

    console.log(5555, isAuth)

    const value = {isAuth, signIn, signUp, signOut}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}