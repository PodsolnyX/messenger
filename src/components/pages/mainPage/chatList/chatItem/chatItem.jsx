import "./chatItem.css"
import UserItem from "../../usersList/userItem/userItem";
import {getUserAvatar} from "../../../../../helpers/helpers";

const ChatItem = (props) => {

    const chatAvatarLink = getUserAvatar(props.chatAvatarId);

    return (
        <UserItem>
            <div className={"chat-item-info"}>
                <div className={"text-primary"} style={{fontSize: "14px"}}>{props.chatName}</div>
                <div className={"text-tertiary"}>{props.time}</div>
            </div>
            <div className={"chat-item-details"}>
                <div className={"text-secondary text-message"} style={{fontSize: "14px"}}>
                    {props.lastMessage.textMessage}
                </div>
                {
                    props.unviewedMessages > 0 &&
                    <div className={"chat-item-messages-count"}>{props.unviewedMessages}</div>
                }
            </div>
        </UserItem>
    );
}

export default ChatItem;