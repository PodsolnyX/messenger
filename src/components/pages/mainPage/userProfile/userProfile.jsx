import "./userProfie.css"
import {useDispatch, useSelector} from "react-redux";
import emailIcon from "./../../../../assets/icons/email.svg"
import dateIcon from "./../../../../assets/icons/date.svg"
import phoneIcon from "./../../../../assets/icons/phone.svg"
import editIcon from "./../../../../assets/icons/edit.svg"
import exitIcon from "./../../../../assets/icons/exit.svg"
import passwordIcon from "./../../../../assets/icons/password.svg"
import {useAuth} from "../../../../hooks/useAuth";
import {setViewChangePassword, setViewEditProfile} from "../../../../store/reducers/generalReducer";



const UserProfile = (props) => {

    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();
    const user = useAuth();

    const avatar =
        `http://chat.markridge.space/api/files/f6cdec02-261c-4583-b5e3-11459c1cf673?attachment=false&access_token=${localStorage.getItem("accessToken")}`;

    return (
        <div className={"profile-container"}>
            <div className={"profile-content"}>
                <div className={"profile-avatar"} style={{backgroundImage: `url(${avatar})`}}></div>
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
    );
}

export default UserProfile;