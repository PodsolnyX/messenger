import "./chatList.css"
import ChatItem from "./chatItem/chatItem";
import pencil from "../../../../../assets/icons/pencil.svg"
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPreviewChats} from "../../../../../store/reducers/chatReducer";
import Loader from "../../../../other/loader/loader";
import {setViewFriendsList, setViewProfile} from "../../../../../store/reducers/generalReducer";
import FloatButton from "../../../../other/floatButton/floatButton";
import NavBack from "../../../../other/navBack/navBack";
import burgerMenuIcon from "../../../../../assets/icons/burger_menu.svg"

const ChatList = (props) => {

    const dispatch = useDispatch();
    const previewChats = useSelector(state => state.chat.previewChats);
    const isLoading = useSelector(state => state.chat.isLoading);

    useEffect(() => {
        dispatch(getPreviewChats());
    }, [])

    return (
        <div className={"side-bar-component-container"}>
            <NavBack icon={burgerMenuIcon} callback={() => dispatch(setViewProfile())}/>
            <div className={"side-bar-content overflowY"}>
                {
                    isLoading ? <Loader/> :
                        previewChats.length === 0 ?
                            <div className={"side-bar-empty-content"}>
                                У Вас ещё нет чатов.<br/>Начните общаться прямо сейчас!
                            </div> :
                            previewChats.map((person, i) => <ChatItem {...person} key={i}/>)

                }
                <FloatButton
                    icon={pencil}
                    iconHeight={"20px"}
                    callback={() => dispatch(setViewFriendsList())}
                />
            </div>
        </div>
    );
}

export default ChatList;