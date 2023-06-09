import "./loginPage.css"
import {Link} from "react-router-dom";
import {reduxForm} from "redux-form";
import {required} from "../../../helpers/validators";
import Input from "../../other/input/input";
import {useAuth} from "../../../hooks/useAuth";
import {useSelector} from "react-redux";


const LoginForm = (props) => {

    return (
        <form className={"login-form"} onSubmit={props.handleSubmit}>
            <div>
                <label htmlFor="email">Логин</label>
                <Input type="text" name="email" validate={[required]}/>
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <Input type="password" name={"password"} validate={[required]}/>
            </div>
            <button disabled={props.isLoading}>Войти</button>
        </form>
    );
}

const LoginFormRedux = reduxForm({form: "login"})(LoginForm)

const LoginPage = (props) => {

    const user = useAuth();
    const isLoading = useSelector((state) => state.user.isLoading)

    const onSubmit = (formData) => {
        user.signIn(formData);
    }

    return (
        <div className={"login-page-bg"}>
            <div className={"login-page-content"}>
                <h4>Messenger!</h4>
                <LoginFormRedux onSubmit={onSubmit} isLoading={isLoading}/>
                <div>
                    У вас нет аккаунта? <Link to={"/registration"}>Зарегистрируйтесь</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;