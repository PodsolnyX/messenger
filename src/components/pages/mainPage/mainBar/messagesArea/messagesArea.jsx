import "./messagesArea.css"
import MessageItem from "../messageItem/messageItem";
import MessageInput from "../messageInput/messageInput";
import {useEffect} from "react";
import {
    getChatDetails,
    getChatMessages,
    sendMessage,
    setChatId,
    viewMessage
} from "../../../../../store/reducers/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../../other/loader/loader";
import {useNavigate, useParams} from "react-router-dom";
import {useScroll} from "../../../../../hooks/useScroll";
import {SIZE_MESSAGE_PAGE} from "../../../../../helpers/constants";
import Navbar from "../../../../other/navbar/navbar";
import {getFileLinkToView} from "../../../../../helpers/helpers";
import {setViewChatList} from "../../../../../store/reducers/generalReducer";

const MessagesArea = (props) => {

    const dispatch = useDispatch();
    const {chatId} = useParams();
    const navigate = useNavigate();

    const isLoading = useSelector(state => state.chat.isLoadingMessages);
    const isLoadingSendMessage = useSelector(state => state.chat.isLoadingSendMessage);
    const messages = useSelector(state => state.chat.messages);
    const chatDetails = useSelector(state => state.chat.chatDetails);
    const messagesPageCount = useSelector(state => state.chat.messagesPageCount);
    const userId = useSelector(state => state.user.userData?.id);
    const usersOnline = useSelector(state => state.user.usersOnline)

    let isOnline = false;

    if (chatDetails.users) {
        isOnline = usersOnline.includes(
            chatDetails.administrators.length === 0 && chatDetails.users[0] !== userId ? chatDetails.users[0] : chatDetails.users[1])
    }

    const {anchor, onScroll} = useScroll(
        messages,
        SIZE_MESSAGE_PAGE,
        messagesPageCount,
        () => dispatch(getChatMessages(chatId, false))
    );

    useEffect(() => {
        dispatch(setChatId(chatId));
        dispatch(getChatDetails(chatId));
        dispatch(getChatMessages(chatId, true, () => navigate("/")));
    }, [chatId])

    useEffect(() => {
        if (messages.length > 0 && !messages[0].isViewed && messages[0].senderId !== userId)
            dispatch(viewMessage(messages[0].id))
    }, [messages])

    console.log(messages)

    return (
        isLoading && messages.length === 0 ? <div className={"messages-list-empty"}>
                <Loader/>
            </div> :
            <div className={"messages-area-container"}>
                <Navbar isBack={true} withBG={true}
                        callback={() => {
                            dispatch(setViewChatList());
                            navigate("/");
                        }}>
                    <div className={"messages-area-nav"}>
                        <div className={"messages-area-nav-avatar"}>
                            <img src={getFileLinkToView(chatDetails?.chatAvatarId)} alt={""}/>
                        </div>
                        <div className={"messages-area-nav-name"}>
                            <div>{chatDetails?.chatName}</div>
                            <div>{isOnline ? "online" : "offline"}</div>
                        </div>

                    </div>
                </Navbar>
                <div className={"main-bar-content"}>
                    <div ref={anchor} className={"messages-list-container"} onScroll={onScroll}>
                        {
                            messages.length === 0 ?
                                <div className={"messages-list-empty"}>
                                    В чате ещё нет сообщений. <br/> Напишите первым!
                                </div> :
                                <div className={"messages-list"}>
                                    {
                                        messages.slice(0).reverse().map(message =>
                                            <MessageItem
                                                {...message}
                                                isIncoming={message.senderId !== userId}
                                                key={message.id}
                                            />)
                                    }
                                </div>
                        }
                    </div>
                    <div className={"input-container"}>
                        <MessageInput
                            isLoading={isLoadingSendMessage}
                            callback={(textMessage, files) =>
                                dispatch(sendMessage(chatId, textMessage, files))}
                        />
                    </div>
                </div>
            </div>

    );
}

export default MessagesArea;