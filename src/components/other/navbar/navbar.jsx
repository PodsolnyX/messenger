import "./navbar.css"
import {useAuth} from "../../../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import {setViewChatList, setViewProfile} from "../../../store/reducers/generalReducer";
import {getUserAvatar} from "../../../helpers/helpers";

const Navbar = (props) => {

    const user = useAuth();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);

    const avatarLink = getUserAvatar(userData?.photoId);

    const onProfile = () => {
        dispatch(setViewProfile());
    }

    const onContacts = () => {
        dispatch(setViewChatList());
    }

    return (
        <div className={"navbar-container"}>
            <div className={"navbar-logo text-primary"} onClick={onContacts}>Messenger</div>
            <div className={"navbar-settings"}>
                <div className={"nav-user"}>
                    <img src={avatarLink} alt="account" onClick={onProfile}/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;