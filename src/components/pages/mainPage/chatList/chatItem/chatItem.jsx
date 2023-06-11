import "./chatItem.css"

const ChatItem = (props) => {
    return (
        <div className={"chat-item-container"}>
            <div className={"chat-item-avatar"}>
                <img alt={""} src={props.image}/>
            </div>
            <div className={"chat-item-description"}>
                <div className={"chat-item-info"}>
                    <div className={"text-primary"} style={{fontSize: "14px"}}>{props.name}</div>
                    <div className={"text-tertiary"}>{props.time}</div>
                </div>
                <div className={"chat-item-details"}>
                    <div className={"text-secondary text-message"} style={{fontSize: "14px"}}>{props.message}</div>
                    {
                        props.count > 0 &&
                        <div className={"chat-item-messages-count"}>{props.count}</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ChatItem;