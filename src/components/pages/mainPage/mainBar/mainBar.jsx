import "./mainBar.css"
import MessagesArea from "./messagesArea/messagesArea";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const MainBar = (props) => {

    const isMobile = useSelector(state => state.general.isMobile)
    const { chatId } = useParams();
    const isView = !!((chatId && isMobile) || !isMobile);

    return (
        <div className={"main-bar"} style={!isView ? {display: "none"} : {}}>
            { chatId && <MessagesArea/> }
        </div>
    );
}

export default MainBar;