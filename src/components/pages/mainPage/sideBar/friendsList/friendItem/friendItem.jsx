import "./friendItem.css"
import {getUserAvatar} from "../../../../../../helpers/helpers";
import UserCard from "../../../../../other/userCard/userCard";

const FriendItem = (props) => {

    const avatarLink = getUserAvatar(props.photoId);

    return (
        <UserCard avatarLink={avatarLink}>
            <div className={"text-primary"} style={{fontSize: "16px"}}>{props.fullName}</div>
        </UserCard>
    );
}

export default FriendItem;