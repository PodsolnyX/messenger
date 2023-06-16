import "./userProfie.css"
import {useDispatch, useSelector} from "react-redux";
import emailIcon from "../../../../../assets/icons/email.svg"
import dateIcon from "../../../../../assets/icons/date.svg"
import phoneIcon from "../../../../../assets/icons/phone.svg"
import editIcon from "../../../../../assets/icons/edit.svg"
import exitIcon from "../../../../../assets/icons/exit.svg"
import passwordIcon from "../../../../../assets/icons/password.svg"
import onlineIcon from "../../../../../assets/icons/online.svg"
import {useAuth} from "../../../../../hooks/useAuth";
import {setViewChangePassword, setViewChatList, setViewEditProfile} from "../../../../../store/reducers/generalReducer";
import {getFileLinkToView} from "../../../../../helpers/helpers";
import Navbar from "../../../../other/navbar/navbar";
import Icon from "../../../../other/icon/icon";
import {setUserOnlinePreference} from "../../../../../store/reducers/userReducer";
import {
    ONLINE_PREFERENCE_OPTIONS,
    ONLINE_PREFERENCE_TYPE,
    USER_REQUESTS_OPTIONS
} from "../../../../../helpers/constants";
import {setIsUserRequests} from "../../../../../store/reducers/friendReducer";
import SelectInput from "../../../../other/selectInput/selectInput";


const UserProfile = (props) => {

    const userData = useSelector((state) => state.user.userData);
    const onlinePreference = useSelector(state => state.user.onlinePreference)
    const dispatch = useDispatch();
    const user = useAuth();

    return (
        <div className={"side-bar-component-container profile-container"}>
            <Navbar callback={() => dispatch(setViewChatList())} title={"Профиль"}/>
            <div className={"side-bar-content"}>
                <div className={"profile-avatar"} style={{backgroundImage: `url(${getFileLinkToView(userData?.photoId)})`}}></div>
                <div className={"profile-main-info"}>
                    <div>
                        <div className={"profile-data-primary"}>
                            {userData?.fullName}
                            <Icon icon={editIcon} size={25} callback={() => {dispatch(setViewEditProfile())}} />
                        </div>
                    </div>
                    <div className={"profile-data-secondary"}>
                        <Icon clickable={false} icon={emailIcon} size={25}/>
                        {userData?.email}
                    </div>
                    <div className={"profile-data-secondary"}>
                        <Icon clickable={false} icon={phoneIcon} size={25}/>
                        {userData?.phoneNumber}
                    </div>
                    <div className={"profile-data-secondary"}>
                        <Icon clickable={false} icon={dateIcon} size={25}/>
                        {userData?.birthDate.slice(0, 10)}
                    </div>
                </div>
                <div className={"profile-actions"}>
                    <div className={"profile-btn-secondary"}>
                        <Icon clickable={false} icon={onlineIcon} size={25}/>
                        Мой онлайн виден:
                        <SelectInput
                            callback={(value) => dispatch(setUserOnlinePreference(value))}
                            value={onlinePreference}
                            options={ONLINE_PREFERENCE_OPTIONS}
                        />
                    </div>
                    <div className={"profile-btn-secondary"} onClick={() => dispatch(setViewChangePassword())}>
                        <Icon clickable={false} icon={passwordIcon} size={25}/>
                        Изменить пароль
                    </div>
                    <div className={"profile-btn-secondary"} onClick={user.signOut}>
                        <Icon clickable={false} icon={exitIcon} size={25}/>
                        Выйти
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;