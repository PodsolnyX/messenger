import "./messageInput.css"
import clipIcon from "../../../assets/icons/clip.svg";
import sendIcon from "../../../assets/icons/send.svg";

const MessageInput = (props) => {
    return (
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
    );
}

export default MessageInput;