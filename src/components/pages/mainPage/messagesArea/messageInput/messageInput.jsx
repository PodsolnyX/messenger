import "./messageInput.css"
import clipIcon from "../../../../../assets/icons/clip.svg";
import sendIcon from "../../../../../assets/icons/send.svg";
import Icon from "../../../../other/icon/icon";

const MessageInput = (props) => {
    return (
        <div className={"message-input-container"}>
            <div className={"message-input"}>
                        <span
                            className="textarea"
                            contentEditable>

                        </span>
                <div className={"button-attach-file"}>
                    <Icon icon={clipIcon} size={20}/>
                </div>
            </div>
            <div className={"button-send-message"}>
                <Icon icon={sendIcon} size={30}/>
            </div>
        </div>
    );
}

export default MessageInput;