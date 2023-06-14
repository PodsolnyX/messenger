import "./messagesArea.css"
import MessageItem from "../messageItem/messageItem";
import MessageInput from "../messageInput/messageInput";
import {useEffect} from "react";
import {getChatMessages, sendMessage, setChatId} from "../../../../../store/reducers/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../../other/loader/loader";
import {useNavigate, useParams} from "react-router-dom";
import {useScroll} from "../../../../../hooks/useScroll";

const MessagesArea = (props) => {

    const dispatch = useDispatch();
    const { chatId } = useParams();
    const navigate = useNavigate();

    const isLoading = useSelector(state => state.chat.isLoadingMessages);
    const isLoadingSendMessage = useSelector(state => state.chat.isLoadingSendMessage);
    const messages = useSelector(state => state.chat.messages);
    const userId = useSelector(state => state.user.userData?.id)

    const anchor = useScroll(messages)

    useEffect(() => {
        dispatch(setChatId(chatId))
        dispatch(getChatMessages(chatId, true, () => navigate("/")));
    }, [chatId])

    return (

        isLoading ? <div className={"messages-list-empty"}>
                <Loader/>
            </div> :
            <div className={"main-bar-content"}>
                <div ref={anchor} className={"messages-list-container"}>
                    <div className={"messages-list"}>
                        {
                            messages.length === 0 ?
                                <div className={"messages-list-empty"}>
                                    В чате ещё нет сообщений. <br/> Напишите первым!
                                </div> :
                                messages.slice(0).reverse().map(message =>
                                        <MessageItem
                                            {...message}
                                            isIncoming={message.senderId !== userId}
                                            key={message.id}
                                        />)
                        }
                    </div>
                </div>
                <div className={"input-container"}>
                    <MessageInput
                        isLoading={isLoadingSendMessage}
                        callback={(textMessage) => dispatch(sendMessage(chatId, textMessage, false))}
                    />
                </div>
            </div>
    );
}

export default MessagesArea;