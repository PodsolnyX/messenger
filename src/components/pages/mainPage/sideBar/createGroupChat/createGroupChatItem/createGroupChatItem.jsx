import "./createGroupChatItem.css"
import UserCard from "../../../../../other/userCard/userCard";
import {getFileLinkToView} from "../../../../../../helpers/helpers";

const CreateGroupChatItem = (props) => {
    return (
        <UserCard avatarLink={getFileLinkToView(props.photoId)} userId={props.id}>
            <div className={"create-group-chat-item"}>
                <div>{props.fullName}</div>
                <input type="checkbox" id={props.id} onChange={props.onChange}/>
            </div>
        </UserCard>
    );
}

export default CreateGroupChatItem;