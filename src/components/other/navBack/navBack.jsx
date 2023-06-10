import backItem from "./../../../assets/icons/back.svg"
import "./navBack.css"

const NavBack = (props) => {
    return (
        <div className={"nav-back-container"}>
            <div className={"btn-nav-back"} onClick={props.callback}>
                <img src={backItem} alt=""/>
            </div>
            <div className={"title-nav-back"}>{props.title}</div>
        </div>
    );
}

export default NavBack;