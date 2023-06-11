import "./editProfile.css"
import NavBack from "../../../other/navBack/navBack";
import {useDispatch, useSelector} from "react-redux";
import {setViewProfile} from "../../../../store/reducers/generalReducer";
import {useForm} from "react-hook-form";
import {Input} from "../../../other/input/input";
import {validators} from "../../../../helpers/validators";

const EditProfileForm = (props) => {

    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        defaultValues: props.defaultValues
    });

    return (
        <form className={"change-password-form"} onSubmit={handleSubmit(props.onSubmit)}>
            <div>
                <label htmlFor="fullName">Имя</label>
                <Input name={"fullName"} register={register} errors={errors}
                       options={{
                           required: validators.required,
                           pattern: validators.fullNamePattern
                       }}/>
            </div>
            <div>
                <label htmlFor="birthDate">Дата рождения</label>
                <Input name={"birthDate"} register={register} errors={errors} type={"date"}
                       max={new Date().toISOString().slice(0, 10)}
                       options={{
                           required: validators.required,
                           max: validators.maxBirthDate,
                           min: validators.minBirthDate
                       }}/>
            </div>
            <button disabled={props.isLoading}>Сохранить изменения</button>
        </form>
    );
}

const EditProfile = (props) => {

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData)

    const onSubmit = (formData) => {
        console.log(formData)
    }

    const avatar =
        `http://chat.markridge.space/api/files/f6cdec02-261c-4583-b5e3-11459c1cf673?attachment=false&access_token=${localStorage.getItem("accessToken")}`;

    return (
        <div>
            <NavBack title={"Редактирование профиля"} callback={() => dispatch(setViewProfile())}/>
            <div className={"edit-profile-avatar"}>
                <img src={avatar} alt=""/>
            </div>
            <EditProfileForm onSubmit={onSubmit}
                             defaultValues={{
                                 fullName: userData.fullName,
                                 birthDate: userData.birthDate.slice(0, 10)
                             }}
            />
        </div>
    );
}

export default EditProfile;