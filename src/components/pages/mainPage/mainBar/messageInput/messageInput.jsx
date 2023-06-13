import "./messageInput.css"
import clipIcon from "../../../../../assets/icons/clip.svg";
import sendIcon from "../../../../../assets/icons/send.svg";
import Icon from "../../../../other/icon/icon";
import {useState} from "react";

const MessageInput = (props) => {

    const [value, setValue] = useState("");

    const onInput = (event) => {
        // console.log(event.target.innerHTML)
    }


    return (
        <div className={"message-input-container"}>
            <div className={"message-input"}>
                        <div
                            onInput={onInput}
                            className="textarea"
                            contentEditable>
                        </div>
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