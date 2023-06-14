import "./mainBar.css"
import MessagesArea from "./messagesArea/messagesArea";
import {useParams} from "react-router-dom";

const MainBar = (props) => {

    const { chatId } = useParams();

    return (
        <div className={"main-bar"}>
            { chatId && <MessagesArea/> }
        </div>
    );
}

export default MainBar;