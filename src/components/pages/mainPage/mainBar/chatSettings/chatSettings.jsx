import "./chatSettings.css"
import Navbar from "../../../../other/navbar/navbar";
import {useDispatch, useSelector} from "react-redux";
import {setViewMessagesArea} from "../../../../../store/reducers/generalReducer";
import {useEffect, useState} from "react";
import {
    addUserToChat,
    deleteChat, deleteUserFromChat, editChatAvatar,
    editNotificationPreference,
    getChatDetails,
    getNotificationPreference, leaveGroupChat, leavePrivateChat, makeUserAdmin,
    setChatId
} from "../../../../../store/reducers/chatReducer";
import {useNavigate, useParams} from "react-router-dom";
import ChatSettingsItem from "./chatSettingsItem/chatSettingsItem";
import {getFileLinkToView} from "../../../../../helpers/helpers";
import Icon from "../../../../other/icon/icon";
import noteIcon from "../../../../../assets/icons/notification.svg";
import SelectInput from "../../../../other/selectInput/selectInput";
import {NOTIFICATION_PREFERENCE_OPTIONS} from "../../../../../helpers/constants";
import exitIcon from "../../../../../assets/icons/exit.svg";
import trashIcon from "../../../../../assets/icons/trash.svg";
import CreateGroupChatItem from "../../sideBar/createGroupChat/createGroupChatItem/createGroupChatItem";
import {getFriendsList} from "../../../../../store/reducers/friendReducer";

const ChatSettings = (props) => {

    const dispatch = useDispatch();
    const {chatId} = useParams();
    const navigate = useNavigate();
    const [isAddNewUsers, setIsAddNewUsers] = useState(false);
    const [newChatUsers, setNewChatUsers] = useState([]);

    const currentChatId = useSelector(state => state.chat.chatId);
    const chatDetails = useSelector(state => state.chat.chatDetails);
    const notePreference = useSelector(state => state.chat.notePreference);
    const friendsList = useSelector(state => state.friends.friendsList);
    const userId = useSelector(state => state.user.userData?.id);

    const userIsAdmin = chatDetails.administrators.includes(userId) && !chatDetails.deletedTime;

    useEffect(() => {
        if (currentChatId !== chatId)
            dispatch(setChatId(chatId));
    }, [chatId])

    useEffect(() => {
        dispatch(getChatDetails(chatId));
        dispatch(getNotificationPreference(chatId));
        dispatch(getFriendsList());
    }, [])

    const onChangeNewUser = (event) => {
        if (event.target.checked && !newChatUsers.includes(event.target.id)) {
            setNewChatUsers([...newChatUsers, event.target.id])
        } else {
            setNewChatUsers([...newChatUsers.filter(id => id !== event.target.id)]);
        }
    }

    const onChangeAvatar = (event) => {
        dispatch(editChatAvatar(chatId, event.target.files[0]))
    }

    const onSaveNewUsers = () => {
        newChatUsers.forEach(id => dispatch(addUserToChat(chatId, id)))
        setIsAddNewUsers(false)
        setNewChatUsers([])
    }

    return (
        <div>
            <Navbar title={"Настройки чата"} withBG={true}
                    callback={() => dispatch(setViewMessagesArea())}/>
            {
                chatDetails.administrators.length !== 0 ?
                    <div className={"chat-settings-container"}>
                        <div className={"chat-settings-info"}
                             style={!userIsAdmin ? {pointerEvents: "none"} : {}}>
                            <div className={"edit-chat-avatar"}>
                                <input type={"file"} id="avatar-input" onChange={onChangeAvatar}
                                       accept="image/png, image/gif, image/jpeg"/>
                                <label htmlFor="avatar-input">
                                    <img src={getFileLinkToView(chatDetails.chatAvatarId)} alt=""/>
                                </label>
                            </div>
                            <div>
                                {chatDetails.chatName}
                            </div>
                        </div>
                        <div className={"profile-actions"}>
                            {
                                !chatDetails.deletedTime &&
                                <div className={"profile-btn-secondary"}>
                                    <Icon clickable={false} icon={noteIcon} size={25}/>
                                    Уведомления:
                                    <SelectInput
                                        callback={(value) => dispatch(editNotificationPreference(chatId, value))}
                                        value={notePreference}
                                        options={NOTIFICATION_PREFERENCE_OPTIONS}
                                    />
                                </div>
                            }
                            <div className={"profile-btn-secondary"}
                                 onClick={() => dispatch(leaveGroupChat(chatId, () => navigate("/")))}
                            >
                                <Icon clickable={false} icon={exitIcon} size={25}/>
                                Выйти из чата
                            </div>
                            {
                                userIsAdmin &&
                                <div className={"profile-btn-secondary"} onClick={() => dispatch(deleteChat(chatId))}>
                                    <Icon clickable={false} icon={trashIcon} size={25}/>
                                    Удалить чат
                                </div>
                            }
                        </div>
                        <div className={"chat-settings-user-list-header"}>
                            <h4>{!isAddNewUsers ? "Участники чата" : "Добавление новых участников"}</h4>
                            {
                                userIsAdmin ?
                                    !isAddNewUsers ?
                                        <div>
                                            <button onClick={() => setIsAddNewUsers(true)}>
                                                Добавить участников
                                            </button>
                                        </div> :
                                        <div>
                                            <button onClick={onSaveNewUsers}>Сохранить</button>
                                            <button onClick={() => setIsAddNewUsers(false)}>
                                                Отмена
                                            </button>
                                        </div>
                                    : undefined
                            }
                        </div>
                        <div className={"chat-settings-user-list"}>
                            {
                                !isAddNewUsers ?
                                    chatDetails.usersDetails.map(user =>
                                        <ChatSettingsItem key={user.id}
                                                          makeAdmin={(userId) => dispatch(makeUserAdmin(chatId, userId))}
                                                          deleteFromChat={(userId) => dispatch(deleteUserFromChat(chatId, userId))}
                                                          userIsAdmin={userIsAdmin}
                                                          isAdmin={chatDetails.administrators.includes(user.id)}
                                                          {...user}/>) :
                                    friendsList.filter(user => !chatDetails.users.includes(user.id)).map(user =>
                                        <CreateGroupChatItem key={user.id} {...user} onChange={onChangeNewUser}/>)
                            }
                        </div>
                    </div> :
                    <div className={"chat-settings-container"}>
                        <div className={"profile-actions"}>
                            <div className={"profile-btn-secondary"}>
                                <Icon clickable={false} icon={noteIcon} size={25}/>
                                Уведомления:
                                <SelectInput
                                    callback={(value) => dispatch(editNotificationPreference(chatId, value))}
                                    value={notePreference}
                                    options={NOTIFICATION_PREFERENCE_OPTIONS}
                                />
                            </div>
                            <div className={"profile-btn-secondary"}
                                 onClick={() => dispatch(leavePrivateChat(chatId, () => navigate("/")))}
                            >
                                <Icon clickable={false} icon={exitIcon} size={25}/>
                                Выйти из чата
                            </div>
                        </div>
                    </div>
            }

        </div>

    );
}


export default ChatSettings;