import "./mainPage.css"
import MainBar from "./mainBar/mainBar";
import SideBar from "./sideBar/sideBar";

const MainPage = (props) => {

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