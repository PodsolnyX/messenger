import "./mainPage.css"
import MainBar from "./mainBar/mainBar";
import SideBar from "./sideBar/sideBar";
import {useRefreshToken} from "../../../hooks/useRefreshToken";
import {useSignalR} from "../../../hooks/useSignalR";

const MainPage = (props) => {

    useSignalR();
    useRefreshToken();

    return (
        <div>
            <div className={"main-container"}>
                <SideBar/>
                <MainBar/>
            </div>
        </div>

    );
}

export default MainPage;