import "./friendItem.css"
import {getFileLinkToView} from "../../../../../../helpers/helpers";
import UserCard from "../../../../../other/userCard/userCard";
import Icon from "../../../../../other/icon/icon";
import deleteContact from "./../../../../../../assets/icons/delete_contact.svg"

const FriendItem = (props) => {

    return (
        <UserCard avatarLink={getFileLinkToView(props.photoId)} userId={props.id}>
            <div className={"friend-item"}>
                <div className={"text-primary"} style={{fontSize: "16px", cursor: "pointer"}}
                     onClick={() => props.onChat(props.id)} >
                    {props.fullName}
                </div>
                <Icon icon={deleteContact} size={28} callback={() => props.onDelete(props.id)}/>
            </div>
        </UserCard>
    );
}

export default FriendItem;