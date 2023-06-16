import "./friendshipRequestsItem.css"
import {getFileLinkToView} from "../../../../../../helpers/helpers";
import UserCard from "../../../../../other/userCard/userCard";
import Icon from "../../../../../other/icon/icon";
import deleteIcon from "./../../../../../../assets/icons/delete_contact.svg"
import addIcon from "./../../../../../../assets/icons/add_contact_light.svg"

const FriendshipRequestsItem = (props) => {

    return (
        <UserCard avatarLink={getFileLinkToView(props.photoId)}>
            <div className={"friendship-requests-item"}>
                <div className={"text-primary"} style={{fontSize: "16px"}}>{props.fullName}</div>
                    <div>
                        {
                            props.isUserRequests === "false" &&
                            <div className={"btn-accept-request"} >
                                <Icon icon={addIcon} size={28} callback={() => props.onAccept(props.id)}/>
                            </div>
                        }
                        <Icon icon={deleteIcon} size={28} callback={() => props.onReject(props.id)}/>
                    </div>
            </div>
        </UserCard>
    );
}

export default FriendshipRequestsItem;