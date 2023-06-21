import "./messagesArea.css"
import MessageItem from "./messageItem/messageItem";
import MessageInput from "./messageInput/messageInput";
import {useEffect} from "react";
import {
    getChatDetails,
    getChatMessages,
    sendMessage, setChatId,
    viewMessage
} from "../../../../../store/reducers/chatReducer";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../../../other/loader/loader";
import {useNavigate, useParams} from "react-router-dom";
import {useScroll} from "../../../../../hooks/useScroll";
import {SIZE_MESSAGE_PAGE} from "../../../../../helpers/constants";
import Navbar from "../../../../other/navbar/navbar";
import {getFileLinkToView} from "../../../../../helpers/helpers";
import {setViewChatList, setViewChatSettings} from "../../../../../store/reducers/generalReducer";
import Icon from "../../../../other/icon/icon";
import other from "./../../../../../assets/icons/other.svg";

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
            chatDetails.administrators.length === 0 ?
                chatDetails.users[0] !== userId ? chatDetails.users[0] : chatDetails.users[1]
                : undefined)
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

    return (
        isLoading && messages.length === 0 ? <div className={"messages-list-empty"}>
                <Loader/>
            </div> :
            <div className={"messages-area-container"}>
                <Navbar isBack={true} withBG={true}
                        callback={() => {
                            dispatch(setViewChatList());
                            navigate("/");
                            dispatch(setChatId(""))
                        }}>
                    <div className={"messages-area-nav"}>
                        <div>
                            <div className={"messages-area-nav-avatar"}>
                                <img src={getFileLinkToView(chatDetails?.chatAvatarId)} alt={""}/>
                            </div>
                            <div className={"messages-area-nav-name"}>
                                <div>{chatDetails?.chatName}</div>
                                {
                                    chatDetails?.administrators?.length === 0 ?
                                        <div>{isOnline ? "online" : "offline"}</div> : undefined
                                }
                            </div>
                        </div>
                        <Icon icon={other} size={35} callback={() => dispatch(setViewChatSettings())}/>
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
                                                userInfo={chatDetails?.administrators?.length !== 0 ?
                                                    {...chatDetails?.usersDetails?.filter(user => user.id === message.senderId)[0]}
                                                    : undefined
                                            }
                                                withUserInfo={chatDetails?.administrators?.length !== 0}
                                                isIncoming={message.senderId !== userId}
                                                key={message.id}
                                            />)
                                    }
                                </div>
                        }
                    </div>
                    {
                        !chatDetails.deletedTime ?
                        <div className={"input-container"}>
                            <MessageInput
                                isLoading={isLoadingSendMessage}
                                callback={(textMessage, files) =>
                                    dispatch(sendMessage(chatId, textMessage, files))}
                            />
                        </div> :
                            <div className={"input-container"}>
                                Данный чат был удалён. Вы больше не можете писать сообщения и изменять настройки.
                            </div>
                    }
                </div>
            </div>

    );
}

export default MessagesArea;