import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import MainPage from "./components/pages/mainPage/mainPage";
import {Route, Routes} from "react-router-dom";
import ToasterContainer from "./components/other/toaster/toasterContainer";
import {RequireAuth} from "./hocs/requireAuth";
import LoginPage from "./components/pages/loginPage/loginPage";
import {UnrequireAuth} from "./hocs/unrequireAuth";
import RegistrationPage from "./components/pages/registrationPage/registrationPage";
import {useRefreshToken} from "./hooks/useRefreshToken";
import {useUserInformation} from "./hooks/useUserInformation";
import {useSignalR} from "./hooks/useSignalR";

function App() {

    useUserInformation();
    useRefreshToken();
    useSignalR();

    return (
        <div>
            <ToasterContainer/>
            <Routes>
                <Route path="/:chatId?" element={
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
