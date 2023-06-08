import './App.css';
import MainPage from "./components/pages/mainPage/mainPage";
import {Route, Routes} from "react-router-dom";
import ToasterContainer from "./components/other/toaster/toasterContainer";
import LoginPage from "./components/pages/loginPage/loginPageContainer";
import RegistrationPage from "./components/pages/registrationPage/registrationPageContainer";

function App() {
    return (
        <div className="App">
            <ToasterContainer/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
