import "./navbar.css"
import {useAuth} from "../../../hooks/useAuth";
import accountImg from  "./../../../assets/images/avatar.png";
import {useDispatch} from "react-redux";
import {setViewContacts, setViewProfile} from "../../../store/reducers/generalReducer";

const Navbar = (props) => {

    const user = useAuth();
    const dispatch = useDispatch();

    const onProfile = () => {
        dispatch(setViewProfile());
    }

    const onContacts = () => {
        dispatch(setViewContacts());
    }

    return (
        <div className={"navbar-container"}>
            <div className={"navbar-logo text-primary"} onClick={onContacts}>Messenger</div>
            <div className={"navbar-settings"}>
                <div className={"nav-user"}>
                    <img src={accountImg} alt="account" onClick={onProfile}/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;