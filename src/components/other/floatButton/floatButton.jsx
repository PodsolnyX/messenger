import "./floatButton.css"
import Icon from "../icon/icon";

const FloatButton = (props) => {
    return (
        <div className={"float-btn"} onClick={props.callback}>
            <Icon icon={props.icon} size={props.iconHeight}/>
        </div>
    );
}

export default FloatButton;