import "./mainBar.css"
import MessagesArea from "./messagesArea/messagesArea";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {VIEWS} from "../../../../helpers/constants";
import ChatSettings from "./chatSettings/chatSettings";

const MainBar = (props) => {

    const isMobile = useSelector(state => state.general.isMobile)
    const currentView = useSelector((state) => state.general.messageAreaView);
    const { chatId } = useParams();
    const isView = !!((chatId && isMobile) || !isMobile);

    console.log(currentView)

    return (
        <div className={"main-bar"} style={!isView ? {display: "none"} : {}}>
            { chatId && currentView === VIEWS.MESSAGES_AREA && <MessagesArea/> }
            { chatId && currentView === VIEWS.CHAT_SETTINGS && <ChatSettings/>}
        </div>
    );
}

export default MainBar;