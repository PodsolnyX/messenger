import "./userCard.css"
import {connect} from "react-redux";

const UserCard = (props) => {

    return (
        <div className={`user-card-container ${props.callback && "user-card-clickable"} ${props.isSelected && "user-card-selected"}`}
             onClick={props.callback}
        >
            <div className={"user-card-avatar"}>
                <img alt={""} src={props.avatarLink}/>
                {
                    props.isOnline && <span></span>
                }
            </div>
            <div className={"user-card-content"}>
                {
                    props.children
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        isOnline: props.userId && state.user.usersOnline.includes(props.userId)
    }
}

export default connect(mapStateToProps, {})(UserCard);