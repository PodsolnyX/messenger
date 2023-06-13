import "./userCard.css"

const UserCard = (props) => {

    return (
        <div className={`user-card-container ${props.callback && "user-card-clickable"} ${props.isSelected && "user-card-selected"}`}
             onClick={props.callback}
        >
            <div className={"user-card-avatar"}>
                <img alt={""} src={props.avatarLink}/>
            </div>
            <div className={"user-card-content"}>
                {
                    props.children
                }
            </div>
        </div>
    );
}

export default UserCard;