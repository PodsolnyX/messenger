import "./registrationPage.css"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {validators} from "../../../helpers/validators";
import {Input} from "../../other/input/input";

const RegistrationForm = (props) => {

    const {register, handleSubmit, formState: {errors}, watch} = useForm();

    return (
        <form onSubmit={handleSubmit(props.onSubmit)} className={"register-form"}>
            <div>
                <div>
                    <label htmlFor="fullName">Имя</label>
                    <Input name={"fullName"} register={register} errors={errors}
                           options={{
                               required: validators.required,
                               pattern: validators.fullNamePattern
                           }}/>
                </div>
                <div>
                    <label htmlFor="email">Почта</label>
                    <Input name={"email"} register={register} errors={errors} type={"email"}
                           options={{
                               required: validators.required,
                               pattern: validators.emailPattern
                           }}/>
                </div>
            </div>
            <div>
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
                <div>
                    <label htmlFor="phoneNumber">Телефон</label>
                    <Input name={"phoneNumber"} register={register} errors={errors}
                           options={{
                               required: validators.required
                           }}/>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <Input name={"password"} register={register} errors={errors} type={"password"}
                           options={{
                               required: validators.required,
                               minLength: validators.minPasswordLength,
                               maxLength: validators.maxPasswordLength,
                               pattern: validators.passwordPattern
                           }}/>
                </div>
                <div>
                    <label htmlFor="passwordConfirm">Подтверждение пароля</label>
                    <Input name={"passwordConfirm"} register={register} errors={errors} type={"password"}
                           options={{
                               required: validators.required,
                               validate: (val) => watch("password") !== val ? "Пароли не совпадают" : undefined
                           }}/>
                </div>
            </div>
            <button disabled={props.isLoading}>Зарегистрироваться</button>
        </form>
    );
}

const RegistrationPage = (props) => {

    const user = useAuth();
    const isLoading = useSelector((state) => state.user.isLoading)

    const onSubmit = (formData) => {
        console.log(formData)
        user.signUp(formData);
    }

    return (
        <div className={"register-page-bg"}>
            <div className={"register-page-content"}>
                <h4>Регистрация</h4>
                <RegistrationForm onSubmit={onSubmit} isLoading={isLoading}/>
                <div>
                    Уже есть аккаунт? <Link to={"/login"}>Войдите</Link>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;