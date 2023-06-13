import "./mainBar.css"
import MessagesArea from "./messagesArea/messagesArea";
import {useParams} from "react-router-dom";

const MainBar = (props) => {

    const params = useParams();

    return (
        <div className={"main-bar"}>
            { params.chatId && <MessagesArea/> }
        </div>
    );
}

export default MainBar;