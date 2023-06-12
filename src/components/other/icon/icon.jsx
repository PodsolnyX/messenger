import "./icon.css"

const Icon = (props) => {

    const clickable = props.clickable === true || props.clickable === undefined;

    return (
        <div className={`icon ${clickable && "icon-clickable"}`} onClick={props.callback}>
            <img src={props.icon} alt="" style={{height: props.size}}/>
        </div>
    );
}

export default Icon