import "./userItem.css"
import {getUserAvatar} from "../../../../../../helpers/helpers";
import UserCard from "../../../../../other/userCard/userCard";
import addContactIcon from "./../../../../../../assets/icons/add_contact_light.svg"
import Icon from "../../../../../other/icon/icon";

const UserItem = (props) => {

    return (
        <UserCard avatarLink={getUserAvatar(props.photoId)}>
            <div className={"user-item-content"}>
                <div className={"text-primary"} style={{fontSize: "16px"}}>{props.fullName}</div>
                <div className={"user-item-add-contact-btn"}>
                    <Icon icon={addContactIcon} size={28} callback={() => props.onSendRequest(props.id)}/>
                </div>
            </div>

        </UserCard>
    );
}

export default UserItem;