import "./changePassword.css"
import Input from "../../../other/input/input";
import {minLength, required} from "../../../../helpers/validators";
import {reduxForm} from "redux-form";
import NavBack from "../../../other/navBack/navBack";
import {useDispatch, useSelector} from "react-redux";
import {setViewProfile} from "../../../../store/reducers/generalReducer";
import {changePassword} from "../../../../store/reducers/userReducer";

const minLength8 = minLength(8);

const ChangePasswordForm = (props) => {

    return (
        <form className={"change-password-form"} onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor="old_password">Старый пароль</label>
                <Input type="password" name="oldPassword" validate={[required]}/>
            </div>
            <div>
                <label htmlFor="new_password">Новый пароль</label>
                <Input type="password" name={"newPassword"} validate={[required, minLength8]}/>
            </div>
            <button disabled={props.isLoading}>Сменить пароль</button>
        </form>
    );
}

const ChangePasswordFormRedux = reduxForm({form: "changePassword"})(ChangePasswordForm)

const ChangePassword = () => {

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading)

    const onSubmit = (formData) => {
        dispatch(changePassword(formData))
        console.log(formData)
    }

    return (
        <div className={"change-password-container"}>
            <NavBack title={"Изменение пароля"} callback={() => dispatch(setViewProfile())}/>
            <ChangePasswordFormRedux onSubmit={onSubmit} isLoading={isLoading}/>
        </div>
    );
}

export default ChangePassword;