import "./messagesArea.css"
import MessageItem from "../messageItem/messageItem";
import MessageInput from "../messageInput/messageInput";
import {useEffect} from "react";
import {getChatMessages} from "../../../../../store/reducers/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../../other/loader/loader";
import {useNavigate, useParams} from "react-router-dom";


const MessagesArea = (props) => {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const isLoading = useSelector(state => state.chat.isLoadingMessages);
    const messages = useSelector(state => state.chat.messages);
    const userId = useSelector(state => state.user.userData?.id)

    useEffect(() => {
        dispatch(getChatMessages(params.chatId, () => navigate("/")));
    }, [params.chatId])


    return (

        isLoading ? <div className={"messages-list-empty"}>
                <Loader/>
            </div> :
            <div className={"main-bar-content"}>
                <div className={"messages-list-container"}>
                    <div className={"messages-list"}>
                        {
                            messages.length === 0 ?
                                <div className={"messages-list-empty"}>
                                    В чате ещё нет сообщений. <br/> Напишите первым!
                                </div> :
                                messages.map(message =>
                                    <MessageItem
                                        {...message}
                                        isIncoming={message.senderId !== userId}
                                        key={message.id}
                                    />
                                )
                        }
                    </div>
                </div>
                <div className={"input-container"}>
                    <MessageInput/>
                </div>
            </div>
    );
}

export default MessagesArea;