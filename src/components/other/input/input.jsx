import "./input.css"

export const Input = (props) => {
    return (
        <div className={"form-control"}>
            <input {...props.register(props.name, props.options)}
                   className={`form-input ${props.errors[props.name]?.message && "form-input-error"}`}
                   placeholder = {props.placeholder && props.placeholder}
                   type = {props.type ? props.type : "text"}
                   max = {props.max && props.max}
                 />
            <span>{props.errors[props.name]?.message}</span>
        </div>
    );
}