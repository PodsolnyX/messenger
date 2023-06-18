import "./chatSettings.css"
import Navbar from "../../../../other/navbar/navbar";
import {useDispatch, useSelector} from "react-redux";
import {setViewMessagesArea} from "../../../../../store/reducers/generalReducer";
import {useEffect} from "react";
import {getChatDetails, getChatMessages, setChatId} from "../../../../../store/reducers/chatReducer";
import {useParams} from "react-router-dom";
import ChatSettingsItem from "./chatSettingsItem/chatSettingsItem";

const ChatSettings = (props) => {

    const dispatch = useDispatch();
    const { chatId } = useParams();
    const currentChatId = useSelector(state => state.chat.chatId);
    const chatDetails = useSelector(state => state.chat.chatDetails);

    useEffect(() => {
        if (currentChatId !== chatId)
            dispatch(setChatId(chatId));
    }, [chatId])

    useEffect(() => {
        dispatch(getChatDetails(chatId));
    }, [])

    return (
        <div>
            <Navbar title={"Настройки чата"} withBG={true}
                    callback={() => dispatch(setViewMessagesArea())}/>
            <div className={"chat-settings-container"}>
                <div className={"chat-settings-user-list"}>
                    <h4>Участники чата</h4>
                    {
                        chatDetails.usersDetails.map(user =>
                            <ChatSettingsItem key={user.id}
                                              isAdmin={chatDetails.administrators.includes(user.id)}
                                              {...user}/>)
                    }
                </div>
            </div>

        </div>
    );
}

export default ChatSettings;