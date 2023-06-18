import "./chatItem.css"
import {getFileLinkToView} from "../../../../../../helpers/helpers";
import UserCard from "../../../../../other/userCard/userCard";

const ChatItem = (props) => {

    return (
        <UserCard avatarLink={getFileLinkToView(props.chatAvatarId)}
                  isSelected={props.isSelected}
                  userId={props.isPrivate ? props.users[0] !== props.userId ? props.users[0] : props.users[1] : undefined}
                  callback={() => props.navigate(`/${props.id}`)}
        >
            <div className={"chat-item-info"}>
                <div className={"text-primary"} style={{fontSize: "14px"}}>{props.chatName}</div>
                <div className={"text-tertiary"}>{props.lastMessage?.createdTime.slice(11, 16)}</div>
            </div>
            <div className={"chat-item-details"}>
                <div className={"text-secondary text-message"} style={{fontSize: "14px"}}>
                    {
                        props.lastMessage?.textMessage ?
                        `${props.lastMessage.senderId === props.userId ? "Вы: " : ""}${props.lastMessage.textMessage}` :
                            props.lastMessage?.id ? "Файл" : "Новый чат"
                    }
                </div>
                {
                    props.unviewedMessages > 0 &&
                    <div className={"chat-item-messages-count"}>{props.unviewedMessages}</div>
                }
            </div>
        </UserCard>
    );
}

export default ChatItem;