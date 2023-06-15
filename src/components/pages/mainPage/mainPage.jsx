import "./mainPage.css"
import MainBar from "./mainBar/mainBar";
import SideBar from "./sideBar/sideBar";
import {useRefreshToken} from "../../../hooks/useRefreshToken";
import {useSignalR} from "../../../hooks/useSignalR";
import {useSelector} from "react-redux";
import {useMobile} from "../../../hooks/useMobile";

const MainPage = (props) => {

    useSignalR();
    useRefreshToken();
    useMobile();
    const mobileRef = useSelector(state => state.general.mobileRef)

    return (
        <div>
            <div ref={mobileRef} className={"main-container"}>
                <SideBar/>
                <MainBar/>
            </div>
        </div>

    );
}

export default MainPage;