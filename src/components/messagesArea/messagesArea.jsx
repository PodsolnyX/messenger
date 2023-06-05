import "./messagesArea.css"
import sendIcon from "./../../assets/icons/send.svg"
import clipIcon from "./../../assets/icons/clip.svg"

const MessagesArea = (props) => {
    return (
        <div className={"messages-area"}>
            <div className={"messages-container "}>
                <div className={"messages-list"}>

                </div>
                <div className={"message-input-container"}>
                    <div className={"message-input"}>
                        <span
                            className="textarea"
                            contentEditable>

                        </span>
                        <div className={"button-attach-file"}>
                            <img src={clipIcon} alt={""}/>
                        </div>
                    </div>
                    <div className={"button-send-message"}>
                        <img alt={""} src={sendIcon}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagesArea;