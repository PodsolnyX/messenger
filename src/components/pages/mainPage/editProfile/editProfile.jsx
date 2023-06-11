import "./editProfile.css"
import NavBack from "../../../other/navBack/navBack";
import {useDispatch, useSelector} from "react-redux";
import {setViewProfile} from "../../../../store/reducers/generalReducer";
import {useForm} from "react-hook-form";
import {Input} from "../../../other/input/input";
import {validators} from "../../../../helpers/validators";
import {editAvatarProfile, editInfoProfile} from "../../../../store/reducers/userReducer";
import {getUserAvatar} from "../../../../helpers/helpers";

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
    const userData = useSelector((state) => state.user.userData);
    const isLoading = useSelector((state) => state.user.isLoading);

    const onSubmit = (formData) => {
        dispatch(editInfoProfile(formData))
    }

    const onChangeAvatar = (event) => {
        dispatch(editAvatarProfile(event.target.files[0]))
    }

    const avatarLink = getUserAvatar(userData.photoId);

    return (
        <div>
            <NavBack title={"Редактирование профиля"} callback={() => dispatch(setViewProfile())}/>

            <div className={"edit-profile-avatar"}>
                <input type={"file"} id="avatar-input" onChange={onChangeAvatar}
                       accept="image/png, image/gif, image/jpeg"/>
                <label htmlFor="avatar-input">
                    <img src={avatarLink} alt=""/>
                </label>
            </div>

            <EditProfileForm onSubmit={onSubmit} isLoading={isLoading}
                             defaultValues={{
                                 fullName: userData.fullName,
                                 birthDate: userData.birthDate.slice(0, 10)
                             }}
            />
        </div>
    );
}

export default EditProfile;