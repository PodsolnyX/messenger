import "./userCard.css"

const UserCard = (props) => {

    return (
        <div className={"user-card-container"}>
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