import "./userProfie.css"
import {useDispatch, useSelector} from "react-redux";
import emailIcon from "../../../../../assets/icons/email.svg"
import dateIcon from "../../../../../assets/icons/date.svg"
import phoneIcon from "../../../../../assets/icons/phone.svg"
import editIcon from "../../../../../assets/icons/edit.svg"
import exitIcon from "../../../../../assets/icons/exit.svg"
import passwordIcon from "../../../../../assets/icons/password.svg"
import {useAuth} from "../../../../../hooks/useAuth";
import {setViewChangePassword, setViewChatList, setViewEditProfile} from "../../../../../store/reducers/generalReducer";
import {getUserAvatar} from "../../../../../helpers/helpers";
import NavBack from "../../../../other/navBack/navBack";



const UserProfile = (props) => {

    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const user = useAuth();

    return (
        <div className={"side-bar-component-container profile-container"}>
            <NavBack callback={() => dispatch(setViewChatList())} title={"Профиль"}/>
            <div className={"side-bar-content"}>
                <div className={"profile-avatar"} style={{backgroundImage: `url(${getUserAvatar(userData?.photoId)})`}}></div>
                <div className={"profile-main-info"}>
                    <div>
                        <div className={"profile-data-primary"}>
                            {userData?.fullName}
                            <img src={editIcon} alt="" onClick={() => {dispatch(setViewEditProfile())}}/>
                        </div>
                    </div>
                    <div className={"profile-data-secondary"}>
                        <img src={emailIcon} alt=""/>
                        {userData?.email}
                    </div>
                    <div className={"profile-data-secondary"}>
                        <img src={phoneIcon} alt=""/>
                        {userData?.phoneNumber}
                    </div>
                    <div className={"profile-data-secondary"}>
                        <img src={dateIcon} alt=""/>
                        {userData?.birthDate.slice(0, 10)}
                    </div>
                </div>
                <div className={"profile-actions"}>
                    <div className={"profile-btn-secondary"} onClick={() => dispatch(setViewChangePassword())}>
                        <img src={passwordIcon} alt=""/>
                        Изменить пароль
                    </div>
                    <div className={"profile-btn-secondary"} onClick={user.signOut}>
                        <img src={exitIcon} alt=""/>
                        Выйти
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;