import './App.css';
import MainPage from "./components/pages/mainPage/mainPage";
import {Route, Routes} from "react-router-dom";
import ToasterContainer from "./components/other/toaster/toasterContainer";
import {RequireAuth} from "./hocs/requireAuth";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "./store/reducers/userReducer";
import LoginPage from "./components/pages/loginPage/loginPage";
import {UnrequireAuth} from "./hocs/unrequireAuth";
import RegistrationPage from "./components/pages/registrationPage/registrationPage";

function App() {

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user.isAuth);

    useEffect(() => {
        if (isAuth) {
            dispatch(getUserProfile());
        }
    }, [isAuth])

    return (
        <div className="App">
            <ToasterContainer/>
            <Routes>
                <Route path="/" element={
                    <RequireAuth>
                        <MainPage/>
                    </RequireAuth>
                }/>
                <Route path="/login" element={
                    <UnrequireAuth>
                        <LoginPage/>
                    </UnrequireAuth>

                }/>
                <Route path="/registration" element={
                    <UnrequireAuth>
                        <RegistrationPage/>
                    </UnrequireAuth>
                }/>
            </Routes>
        </div>
    );
}

export default App;
