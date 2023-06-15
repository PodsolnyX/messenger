import backIcon from "./../../../assets/icons/back.svg"
import "./navbar.css"
import Icon from "../icon/icon";

const Navbar = (props) => {

    const isBack = props.isBack === undefined || props.isBack === true;

    return (
        <div className={`nav-back-container ${props.withBG && "nav-back-bg"}`}>
            {
                isBack &&
                <div>
                    <Icon icon={props.icon ? props.icon : backIcon} size={25} callback={props.callback}/>
                </div>
            }
            {
                props.title && <div className={"title-nav-back"}>{props.title}</div>
            }
            { props.children }
        </div>
    );
}

export default Navbar;