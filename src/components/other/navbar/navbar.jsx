import "./navbar.css"
import {useAuth} from "../../../hooks/useAuth";

const Navbar = (props) => {

    const user = useAuth();

    return (
        <div className={"navbar-container"}>
            <div className={"navbar-logo text-primary"}>Messenger</div>
            <div className={"navbar-settings"}>
                <div className={"text-secondary"}>
                    <button onClick={user.signOut}>
                        Выйти
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;