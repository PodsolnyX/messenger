import "./messageItem.css"

const MessageItem = (props) => {
    return (
        <div className={`message-item-container-${props.isIncoming ? "incoming" : "exiting"}`}>
            <div className={`message-item message-item-${props.isIncoming ? "incoming" : "exiting"}`}>
                <p>{props.text}</p>
                <div>{"10:35"}</div>
            </div>
        </div>
    );
}

export default MessageItem;