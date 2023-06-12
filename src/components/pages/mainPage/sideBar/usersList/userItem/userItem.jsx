import "./userItem.css"
import {getUserAvatar} from "../../../../../../helpers/helpers";
import UserCard from "../../../../../other/userCard/userCard";
import addContactIcon from "./../../../../../../assets/icons/add_contact_light.svg"

const UserItem = (props) => {

    console.log(props)

    return (
        <UserCard avatarLink={getUserAvatar(props.photoId)}>
            <div className={"user-item-content"}>
                <div className={"text-primary"} style={{fontSize: "16px"}}>{props.fullName}</div>
                <div className={"user-item-add-contact-btn"}>
                    <img src={addContactIcon} alt="" onClick={() => props.onSendRequest(props.id)}/>
                </div>
            </div>

        </UserCard>
    );
}

export default UserItem;