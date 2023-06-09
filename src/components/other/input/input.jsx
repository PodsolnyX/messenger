import {Field} from "redux-form";
import "./input.css"

const Input = (props) => {
    return (
        <Field component={InputControl}
               type={props.type} name={props.name} placeholder={props.placeholder}
               validate={props.validate}/>
    );
}

const InputControl = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={`form-control`}>
            <input {...input} {...props} className={`form-input ${hasError && "form-input-error"}`}/>
            { hasError && <span>{meta.error}</span> }
        </div>

    );
}

export default Input;