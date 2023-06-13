import "./chatItem.css"
import {getUserAvatar} from "../../../../../../helpers/helpers";
import UserCard from "../../../../../other/userCard/userCard";

const ChatItem = (props) => {

    return (
        <UserCard avatarLink={getUserAvatar(props.chatAvatarId)}>
            <div className={"chat-item-info"}>
                <div className={"text-primary"} style={{fontSize: "14px"}}>{props.chatName}</div>
                <div className={"text-tertiary"}>{props.time}</div>
            </div>
            <div className={"chat-item-details"}>
                <div className={"text-secondary text-message"} style={{fontSize: "14px"}}>
                    {
                        props.lastMessage?.textMessage ?
                        props.lastMessage.textMessage :
                            "Новый чат"
                    }
                </div>
                {
                    props.unviewedMessages > -1 &&
                    <div className={"chat-item-messages-count"}>{props.unviewedMessages}</div>
                }
            </div>
        </UserCard>
    );
}

export default ChatItem;