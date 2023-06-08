import "./loginPage.css"
import {Link} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

const LoginForm = (props) => {
    return (
        <form className={"login-form"} onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor="email">Логин</label>
                <Field className={"form-input"} component={"input"}
                       type="text" name={"email"}/>
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <Field className={"form-input"} component={"input"}
                       type="password" name={"password"}/>
            </div>
            <button>Войти</button>
        </form>
    );
}

const LoginFormRedux = reduxForm({form: "login"})(LoginForm)

const LoginPage = (props) => {

    const onSubmit = (formData) => {
        console.log(111, formData)
    }

    return (
        <div className={"login-page-bg"}>
            <div className={"login-page-content"}>
                <h4>Messenger!</h4>
                <LoginFormRedux onSubmit={onSubmit}/>
                <div>
                    У вас нет аккаунта? <Link to={"/registration"}>Зарегистрируйтесь</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;