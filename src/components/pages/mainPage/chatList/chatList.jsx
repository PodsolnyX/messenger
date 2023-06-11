import "./chatList.css"
import ChatItem from "./chatItem/chatItem";
import pencil from "../../../../assets/icons/pencil.svg"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPreviewChats} from "../../../../store/reducers/chatReducer";
import Loader from "../../../other/loader/loader";
import {setViewUsersList} from "../../../../store/reducers/generalReducer";

const ChatList = (props) => {

    const dispatch = useDispatch();
    const previewChats = useSelector(state => state.chat.previewChats);
    const isLoading = useSelector(state => state.chat.isLoading);

    useEffect(() => {
        dispatch(getPreviewChats());
    }, [])

    return (
        <div className={"chat-list-container"}>
            <div className={"chats"}>
                {
                    isLoading ? <Loader/> :
                        previewChats.length === 0 ?
                            <div className={"empty-chat-list"}>
                                У Вас ещё нет чатов.<br/>Начните общаться прямо сейчас!
                            </div> :
                            previewChats.map((person, i) => <ChatItem {...person} key={i}/>)

                }
                <div className={"write-message"} onClick={() => dispatch(setViewUsersList())}>
                    <img src={pencil} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default ChatList;