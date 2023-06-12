import backIcon from "./../../../assets/icons/back.svg"
import "./navBack.css"
import Icon from "../icon/icon";

const NavBack = (props) => {

    const isBack = props.isBack === undefined || props.isBack === true;

    return (
        <div className={"nav-back-container"}>
            {
                isBack &&
                <div>
                    <Icon icon={props.icon ? props.icon : backIcon} size={25} callback={props.callback}/>
                </div>
            }
            <div className={"title-nav-back"}>{props.title}</div>
            { props.children }
        </div>
    );
}

export default NavBack;