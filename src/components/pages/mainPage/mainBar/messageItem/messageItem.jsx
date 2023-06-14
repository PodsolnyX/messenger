import "./messageItem.css"

const MessageItem = (props) => {

    return (
        <div className={`message-item-container-${props.isIncoming ? "incoming" : "exiting"}`}
        >
            <div className={`message-item message-item-${props.isIncoming ? "incoming" : "exiting"}`}>
                <p>{props.textMessage}</p>
                <div style={props.editedTime && {fontStyle: "italic"}}>
                    {props.editedTime ?
                        `ред. ${props.editedTime.slice(11, 16)}` :
                        props.createdTime.slice(11, 16)}
                </div>
            </div>
        </div>
    );
}

export default MessageItem;