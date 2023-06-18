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
                    !props.isAdmin &&
                    <div>
                        <Icon icon={star} size={23}/>
                        <Icon icon={deleteUser} size={25}/>
                    </div>
                }
            </div>
        </UserCard>
    );
}

export default ChatSettingsItem;