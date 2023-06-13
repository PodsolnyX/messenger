import "./friendsList.css"
import Navbar from "../../../../other/navbar/navbar";
import {useDispatch, useSelector} from "react-redux";
import {
    setViewChatList,
    setViewFriendshipRequests,
    setViewUsersList
} from "../../../../../store/reducers/generalReducer";
import {useEffect} from "react";
import Loader from "../../../../other/loader/loader";
import addContactIcon from "../../../../../assets/icons/add_contact.svg";
import FloatButton from "../../../../other/floatButton/floatButton";
import {deleteFriend, getFriendsList} from "../../../../../store/reducers/friendReducer";
import Icon from "../../../../other/icon/icon";
import notificationIcon from "./../../../../../assets/icons/notification.svg"
import FriendItem from "./friendItem/friendItem";
import {createPrivateChat} from "../../../../../store/reducers/chatReducer";
import {useNavigate} from "react-router-dom";

const FriendsList = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const friendsList = useSelector(state => state.friends.friendsList);
    const isLoading = useSelector(state => state.friends.isLoading);

    useEffect(() => {
        dispatch(getFriendsList())
    }, [])

    const onDelete = (userId) => {
        dispatch(deleteFriend(userId));
    }

    const onChat = (userId) => {
        dispatch(createPrivateChat(userId, (chatId) => navigate(`/${chatId}`)));
    }

    return (
        <div className={"side-bar-component-container"}>
            <Navbar callback={() => dispatch(setViewChatList())} title={"Друзья"}>
                <div className={"friends-note-container"}>
                    <Icon icon={notificationIcon} size={25} callback={() => dispatch(setViewFriendshipRequests())}/>
                </div>
            </Navbar>
            <div className={"side-bar-content overflowY"}>
                    {
                        isLoading ? <Loader/> :
                            friendsList.length === 0 ?
                                <div className={"side-bar-empty-content"}>
                                    У вас пока нет друзей
                                </div> :
                                friendsList.map((user) => <FriendItem
                                        {...user} key={user.id}
                                        onDelete={onDelete}
                                        onChat={onChat}
                                />
                                )
                    }
                <FloatButton
                    icon={addContactIcon}
                    iconHeight={"28px"}
                    callback={() => dispatch(setViewUsersList())}
                />
            </div>

        </div>
    );
}

export default FriendsList;