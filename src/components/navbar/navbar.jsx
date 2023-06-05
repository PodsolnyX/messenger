import "./navbar.css"

const Navbar = (props) => {
    return (
        <div className={"navbar-container"}>
            <div className={"navbar-logo text-primary"}>Messenger</div>
            <div className={"navbar-settings"}>
                <div className={"text-secondary"}>Настр</div>
                <div className={"text-secondary"}>...</div>
                <div className={"user-profile-avatar text-secondary"}>Фото</div>
            </div>
        </div>
    );
}

export default Navbar;