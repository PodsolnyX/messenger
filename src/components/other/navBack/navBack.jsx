import backIcon from "./../../../assets/icons/back.svg"
import "./navBack.css"

const NavBack = (props) => {

    const isBack = props.isBack === undefined || props.isBack === true;

    return (
        <div className={"nav-back-container"}>
            {
                isBack &&
                <div className={"btn-nav-back"} onClick={props.callback}>
                    <img src={props.icon ? props.icon : backIcon} alt=""/>
                </div>
            }
            {
                props.children ? props.children :
                    <div className={"title-nav-back"}>{props.title}</div>
            }
        </div>
    );
}

export default NavBack;