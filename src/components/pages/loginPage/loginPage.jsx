import "./loginPage.css"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {validators} from "../../../helpers/validators";
import {Input} from "../../other/input/input";

const LoginForm = (props) => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    return (
        <form className={"login-form"} onSubmit={handleSubmit(props.onSubmit)}>
            <div>
                <label htmlFor="email">Логин</label>
                <Input name={"email"} register={register} errors={errors} type={"email"}
                       maxLength={validators.maxLengthFullname}
                       options={{
                           required: validators.required
                       }}/>
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <Input name={"password"} register={register} errors={errors} type={"password"}
                       maxLength={validators.maxLengthPassword}
                       options={{
                           required: validators.required
                       }}/>
            </div>
            <button disabled={props.isLoading}>Войти</button>
        </form>
    );
}

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
                <LoginForm onSubmit={onSubmit} isLoading={isLoading}/>
                <div>
                    У вас нет аккаунта? <Link to={"/registration"}>Зарегистрируйтесь</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;