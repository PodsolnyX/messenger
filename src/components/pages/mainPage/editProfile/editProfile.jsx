import "./editProfile.css"
import NavBack from "../../../other/navBack/navBack";
import {connect, useDispatch} from "react-redux";
import {setViewProfile} from "../../../../store/reducers/generalReducer";
import Input from "../../../other/input/input";
import {required} from "../../../../helpers/validators";
import {reduxForm} from "redux-form";

const EditProfileForm = (props) => {

    return (
        <form className={"change-password-form"} onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor="fullName">Имя</label>
                <Input type="text" name="fullName" validate={[required]}/>
            </div>
            <div>
                <label htmlFor="birthDate">Дата рождения</label>
                <Input type="date" name={"birthDate"} validate={[required]}/>
            </div>
            <button disabled={props.isLoading}>Сохранить изменения</button>
        </form>
    );
}

let EditProfileFormRedux = reduxForm({form: "editProfile"})(EditProfileForm)

EditProfileFormRedux = connect(state => ({
    initialValues: state.user.userData
    }),
    {}
)(EditProfileFormRedux)

const EditProfile = (props) => {

    const dispatch = useDispatch();

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
            <EditProfileFormRedux/>
        </div>
    );
}

export default EditProfile;