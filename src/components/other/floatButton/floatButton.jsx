import "./floatButton.css"

const FloatButton = (props) => {
    return (
        <div className={"float-btn"} onClick={props.callback}>
            <img src={props.icon} alt="" style={{height: props.iconHeight}}/>
        </div>
    );
}

export default FloatButton;