import "./friendshipRequestsItem.css"
import {getUserAvatar} from "../../../../../../helpers/helpers";
import UserCard from "../../../../../other/userCard/userCard";
import Icon from "../../../../../other/icon/icon";
import deleteIcon from "./../../../../../../assets/icons/delete_contact.svg"
import addIcon from "./../../../../../../assets/icons/add_contact_light.svg"

const FriendshipRequestsItem = (props) => {

    return (
        <UserCard avatarLink={getUserAvatar(props.photoId)}>
            <div className={"friendship-requests-item"}>
                <div className={"text-primary"} style={{fontSize: "16px"}}>{props.fullName}</div>
                    <div>
                        {
                            props.isUserRequests === "false" &&
                            <div className={"btn-outline"} onClick={() => props.onAccept(props.id)}>
                                <Icon icon={addIcon} size={28}/>
                            </div>
                        }
                        <div className={"btn-outline btn-danger"} onClick={() => props.onReject(props.id)}>
                            <Icon icon={deleteIcon} size={28}/>
                        </div>
                    </div>
            </div>
        </UserCard>
    );
}

export default FriendshipRequestsItem;