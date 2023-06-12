import "./mainPage.css"
import MessagesArea from "./messagesArea/messagesArea";
import SideBar from "./sideBar/sideBar";

const MainPage = (props) => {

    return (
        <div>
            <div className={"main-container"}>
                <SideBar/>
                <MessagesArea/>
            </div>
        </div>

    );
}

export default MainPage;