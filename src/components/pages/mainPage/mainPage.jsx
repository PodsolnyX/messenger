import "./mainPage.css"
import MessagesArea from "./messagesArea/messagesArea";
import ChatList from "./chatList/chatList";
import Navbar from "../../other/navbar/navbar";
import UserProfile from "./userProfile/userProfile";
import {useSelector} from "react-redux";
import ChangePassword from "./changePassword/changePassword";
import EditProfile from "./editProfile/editProfile";
import {VIEWS} from "../../../helpers/constants";
import UsersList from "./usersList/usersList";
import FriendsList from "./friendsList/friendsList";

const MainPage = (props) => {

    const currentView = useSelector((state) => state.general.currentView);

    return (
        <div>
            <Navbar/>
            <div className={"content"}>
                <div className={"side-bar"}>
                    { currentView === VIEWS.CHATS_LIST && <ChatList/> }
                    { currentView === VIEWS.USERS_LIST && <UsersList/> }
                    { currentView === VIEWS.FRIENDS_LIST && <FriendsList/> }
                    { currentView === VIEWS.PROFILE && <UserProfile/> }
                    { currentView === VIEWS.CHANGE_PASSWORD && <ChangePassword/> }
                    { currentView === VIEWS.EDIT_PROFILE && <EditProfile/> }
                </div>
                <MessagesArea/>
            </div>
        </div>

    );
}

export default MainPage;