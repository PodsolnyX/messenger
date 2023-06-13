import "./changePassword.css"
import Navbar from "../../../../other/navbar/navbar";
import {useDispatch, useSelector} from "react-redux";
import {setViewProfile} from "../../../../../store/reducers/generalReducer";
import {changePassword} from "../../../../../store/reducers/userReducer";
import {Input} from "../../../../other/input/input";
import {useForm} from "react-hook-form";
import {validators} from "../../../../../helpers/validators";

const ChangePasswordForm = (props) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit = (formData) => {
        props.onSubmit(formData);
        reset();
    }

    return (
        <form className={"side-bar-form"} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="oldPassword">Старый пароль</label>
                <Input name={"oldPassword"} register={register} errors={errors} type={"password"}
                       maxLength={validators.maxLengthPassword}
                       options={{
                           required: validators.required
                       }}/>
            </div>
            <div>
                <label htmlFor="newPassword">Новый пароль</label>
                <Input name={"newPassword"} register={register} errors={errors} type={"password"}
                       maxLength={validators.maxLengthPassword}
                       options={{
                           required: validators.required,
                           minLength: validators.minPasswordLength,
                           maxLength: validators.maxPasswordLength,
                           pattern: validators.passwordPattern
                       }}/>
            </div>
            <button disabled={props.isLoading}>Сменить пароль</button>
        </form>
    );
}

const ChangePassword = () => {

    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading);

    const onSubmit = (formData) => {
        dispatch(changePassword(formData))
    }

    return (
        <div className={"side-bar-component-container"}>
            <Navbar title={"Изменение пароля"} callback={() => dispatch(setViewProfile())}/>
            <div className={"side-bar-content"}>
                <ChangePasswordForm onSubmit={onSubmit} isLoading={isLoading}/>
            </div>
        </div>
    );
}

export default ChangePassword;