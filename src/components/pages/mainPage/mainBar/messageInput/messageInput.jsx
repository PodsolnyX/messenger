import "./messageInput.css"
import clipIcon from "../../../../../assets/icons/clip.svg";
import sendIcon from "../../../../../assets/icons/send.svg";
import Icon from "../../../../other/icon/icon";
import {useRef, useState} from "react";
import {convert} from "html-to-text";
import {PuffLoader} from "react-spinners";

const MessageInput = (props) => {

    const [value, setValue] = useState("");
    const inputRef = useRef();

    const onInput = (event) => {
        setValue(convert(event.target.innerHTML));
    }

    const onSend = () => {
        props.callback(value);
        inputRef.current.replaceChildren();
    }

    return (
        <div className={"message-input-container"}>
            <div className={"message-input"}>
                        <div
                            onInput={onInput}
                            ref={inputRef}
                            className="textarea"
                            contentEditable></div>
                <div className={"button-attach-file"}>
                    <Icon icon={clipIcon} size={20}/>
                </div>
            </div>
            <div className={"button-send-message"}
                 style={props.isLoading ? {pointerEvents: "none"} : {}}
                 onClick={onSend}>
                {
                    props.isLoading ? <PuffLoader size={25}/> :
                        <Icon icon={sendIcon} size={30}/>
                }
            </div>
        </div>
    );
}

export default MessageInput;