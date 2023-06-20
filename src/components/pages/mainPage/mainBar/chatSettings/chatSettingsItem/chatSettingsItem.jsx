import "./chatSettingsItem.css"
import UserCard from "../../../../../other/userCard/userCard";
import {getFileLinkToView} from "../../../../../../helpers/helpers";
import Icon from "../../../../../other/icon/icon";
import deleteUser from "./../../../../../../assets/icons/delete_contact.svg"
import star from "./../../../../../../assets/icons/star.svg"

const ChatSettingsItem = (props) => {
    return (
        <UserCard avatarLink={getFileLinkToView(props.photoId)} userId={props.id}>
            <div className={"chat-settings-item"}>
                <div>{props.fullName}<span>{props.isAdmin ? " - Админ" : ""}</span> </div>
                {
                    !props.isAdmin && props.userIsAdmin ?
                    <div>
                        <Icon icon={star} size={23} callback={() => props.makeAdmin(props.id)}/>
                        <Icon icon={deleteUser} size={25} callback={() => props.deleteFromChat(props.id)}/>
                    </div> : undefined
                }
            </div>
        </UserCard>
    );
}

export default ChatSettingsItem;