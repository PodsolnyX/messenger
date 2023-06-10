import "./mainPage.css"
import MessagesArea from "./messagesArea/messagesArea";
import ContactsList from "./contactsList/contactsList";
import Navbar from "../../other/navbar/navbar";
import UserProfile from "./userProfile/userProfile";
import {VIEWS} from "../../../store/reducers/generalReducer";
import {useSelector} from "react-redux";

const MainPage = (props) => {

    const currentView = useSelector((state) => state.general.currentView);

    return (
        <div>
            <Navbar/>
            <div className={"content"}>
                <div className={"side-bar"}>
                    {
                        currentView === VIEWS.CONTACTS && <ContactsList/>
                    }
                    {
                        currentView === VIEWS.PROFILE && <UserProfile/>
                    }
                </div>
                <MessagesArea/>
            </div>
        </div>

    );
}

export default MainPage;