import "./userItem.css"
import {getUserAvatar} from "../../../../../helpers/helpers";

const UserItem = (props) => {

    const avatarLink = getUserAvatar(props.photoId);

    return (
        <div className={"user-item-container"}>
            <div className={"user-item-avatar"}>
                <img alt={""} src={avatarLink}/>
            </div>
            <div className={"user-item-description"}>
                <div className={"text-primary"} style={{fontSize: "16px"}}>{props.fullName}</div>
            </div>
        </div>
    );
}

export default UserItem;