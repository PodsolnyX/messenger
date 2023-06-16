import "./messageItem.css"
import {FILE_TYPE} from "../../../../../helpers/constants";
import {getFileLinkToDownload, getFileLinkToView} from "../../../../../helpers/helpers";

const MessageItem = (props) => {

    return (
        <div className={`message-item-container-${props.isIncoming ? "incoming" : "exiting"}`}
        >
            <div className={`message-item message-item-${props.isIncoming ? "incoming" : "exiting"}`}>
                <p>{props.textMessage}</p>
                <div className={"message-item-images"}>
                    {
                        props.files && props.files.map(file =>
                            file.type === FILE_TYPE.IMAGE ?
                                <img src={getFileLinkToView(file.id)} key={file.id} alt=""/> : undefined)
                    }
                </div>
                <div className={"message-item-content"}>
                    {
                        props.files && props.files.map(file =>
                            file.type === FILE_TYPE.VIDEO ?
                                <video key={file.id} controls >
                                    <source src={getFileLinkToView(file.id)}/>
                                </video> : undefined)
                    }
                </div>
                <div className={"message-item-content"}>
                    {
                        props.files && props.files.map(file =>
                            file.type === FILE_TYPE.AUDIO ?
                                <div key={file.id}>
                                    <div className={"message-item-file-name"}>{file.name}</div>
                                    <audio controls src={getFileLinkToView(file.id)}></audio>
                                </div> : undefined)
                    }
                </div>
                <div className={"message-item-files"}>
                    {
                        props.files && props.files.map(file =>
                            file.type !== FILE_TYPE.IMAGE && file.type !== FILE_TYPE.VIDEO && file.type !== FILE_TYPE.AUDIO ?
                                <a className={"message-item-file-name"}
                                   href={getFileLinkToDownload(file.id)} key={file.id}>{file.name}</a> : undefined)
                    }
                </div>
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