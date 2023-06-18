import "./messageInput.css"
import clipIcon from "../../../../../../assets/icons/clip.svg";
import sendIcon from "../../../../../../assets/icons/send.svg";
import Icon from "../../../../../other/icon/icon";
import {useRef, useState} from "react";
import {convert} from "html-to-text";
import {PuffLoader} from "react-spinners";

const MessageInput = (props) => {

    const [textMessage, setTextMessage] = useState("");
    const [files, setFiles] = useState([]);
    const inputRef = useRef();

    const onInput = (event) => {
        setTextMessage(convert(event.target.innerHTML));
    }

    const onSend = () => {
        if (textMessage.length === 0 && files.length === 0) return
        props.callback(textMessage, files);
        inputRef.current.replaceChildren();
        setTextMessage("")
        setFiles([]);
    }

    const onChangeFiles = (event) => {
        setFiles([...event.target.files]);
    }

    return (
        <div className={"message-input-container"}>
            <div className={"message-input"}>
                <div className={"message-input-top"}>
                    <div
                        onInput={onInput}
                        ref={inputRef}
                        className="textarea"
                        contentEditable></div>
                    <div className={"button-attach-file"}>
                        <label htmlFor={"files-input"}>
                            <Icon icon={clipIcon} size={20}/>
                        </label>
                    </div>
                </div>
                <div className={"message-input-bottom"}>
                    <input type={"file"} id="files-input" multiple onChange={onChangeFiles}/>
                    {
                        files.map((file, i) =>
                            <div className={"message-input-file"} key={i}>{`${file.type} - ${file.name}`}</div>)
                    }
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