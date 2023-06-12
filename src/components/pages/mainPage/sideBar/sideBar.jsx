import "./sideBar.css"
import {VIEWS} from "../../../../helpers/constants";
import ChatList from "./chatList/chatList";
import UsersList from "./usersList/usersList";
import FriendsList from "./friendsList/friendsList";
import UserProfile from "./userProfile/userProfile";
import ChangePassword from "./changePassword/changePassword";
import EditProfile from "./editProfile/editProfile";
import {useSelector} from "react-redux";
import FriendshipRequestsList from "./friendshipRequestsList/friendshipRequestsList";

const SideBar = () => {

    const currentView = useSelector((state) => state.general.currentView);

    return (
      <div className={"side-bar"}>
          { currentView === VIEWS.CHATS_LIST && <ChatList/> }
          { currentView === VIEWS.USERS_LIST && <UsersList/> }
          { currentView === VIEWS.FRIENDS_LIST && <FriendsList/> }
          { currentView === VIEWS.PROFILE && <UserProfile/> }
          { currentView === VIEWS.CHANGE_PASSWORD && <ChangePassword/> }
          { currentView === VIEWS.EDIT_PROFILE && <EditProfile/> }
          { currentView === VIEWS.FRIENDSHIP_REQUESTS_LIST && <FriendshipRequestsList/> }
      </div>
    );
}

export default SideBar;