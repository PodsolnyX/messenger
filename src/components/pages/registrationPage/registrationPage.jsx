import "./registrationPage.css"
import {Link} from "react-router-dom";
import {reduxForm} from "redux-form";
import {correctEmail, correctFullName, maxLength, minLength, required} from "../../../helpers/validators";
import Input from "../../other/input/input";
import {registerUser} from "../../../store/reducers/userReducer";
import {useAuth} from "../../../hooks/useAuth";
import {useSelector} from "react-redux";

const maxLength30 = maxLength(30);
const minLength8 = minLength(8);

const RegistrationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={"register-form"}>
            <div>
                <div>
                    <label htmlFor="fullName">Имя</label>
                    <Input type="text" name="fullName" validate={[required, correctFullName]}/>
                </div>
                <div>
                    <label htmlFor="email">Почта</label>
                    <Input type="email" name="email" validate={[required, correctEmail]}/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="birthDate">Дата рождения</label>
                    <Input type="date" name="birthDate" validate={[required]}/>
                </div>
                <div>
                    <label htmlFor="phoneNumber">Телефон</label>
                    <Input type="text" name="phoneNumber" validate={[required]}/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <Input type="password" name="password" validate={[required, maxLength30, minLength8]}/>
                </div>
                <div>
                    <label htmlFor="passwordConfirm">Подтверждение пароля</label>
                    <Input type="password" name="passwordConfirm" validate={[required]}/>
                </div>
            </div>
            <button disabled={props.isLoading}>Зарегистрироваться</button>
        </form>
    );
}

const RegistrationFormRedux = reduxForm({form: "register"})(RegistrationForm)

const RegistrationPage = (props) => {

    const user = useAuth();
    const isLoading = useSelector((state) => state.user.isLoading)

    const onSubmit = (formData) => {
        user.signUp(formData);
    }

    return (
        <div className={"register-page-bg"}>
            <div className={"register-page-content"}>
                <h4>Регистрация</h4>
                <RegistrationFormRedux onSubmit={onSubmit} isLoading={isLoading}/>
                <div>
                    Уже есть аккаунт? <Link to={"/login"}>Войдите</Link>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;