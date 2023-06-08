import "./registrationPage.css"
import {Link} from "react-router-dom";
import {Field, reduxForm} from "redux-form";


const RegistrationForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={"login-form"}>
            <div>
                <label htmlFor="fullName">Имя</label>
                <Field className={"form-input"} type="text" name={"fullName"} component={"input"}/>
            </div>
            <div>
                <label htmlFor="email">Почта</label>
                <Field className={"form-input"} type="email" name={"email"} component={"input"}/>
            </div>
            <div>
                <label htmlFor="birthDate">Дата рождения</label>
                <Field className={"form-input"} type="date" name={"birthDate"} component={"input"}/>
            </div>
            <div>
                <label htmlFor="phoneNumber">Телефон</label>
                <Field className={"form-input"} type="text" name={"phoneNumber"} component={"input"}/>
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <Field className={"form-input"} type="password" name={"password"} component={"input"}/>
            </div>
            <div>
                <label htmlFor="passwordConfirm">Подтверждение пароля</label>
                <Field className={"form-input"} type="password" name={"passwordConfirm"} component={"input"}/>
            </div>
            <button>Зарегистрироваться</button>
        </form>
    );
}

const RegistrationFormRedux = reduxForm({form: "register"})(RegistrationForm)

const RegistrationPage = (props) => {

    const onSubmit = (formData) => {
        console.log(111, formData)
    }

    return (
        <div className={"login-page-bg"}>
            <div className={"login-page-content"}>
                <h4>Регистрация</h4>
                <RegistrationFormRedux onSubmit={onSubmit}/>
                <div>
                    Уже есть аккаунт? <Link to={"/login"}>Войдите</Link>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;