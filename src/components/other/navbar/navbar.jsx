import "./navbar.css"
import {Link} from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className={"navbar-container"}>
            <div className={"navbar-logo text-primary"}>Messenger</div>
            <div className={"navbar-settings"}>
                <div className={"text-secondary"}>
                    <Link to={"/login"}>
                        Выйти
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;