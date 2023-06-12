import "./friendsList.css"
import NavBack from "../../../../other/navBack/navBack";
import {useDispatch, useSelector} from "react-redux";
import {setViewChatList, setViewUsersList} from "../../../../../store/reducers/generalReducer";
import {useEffect} from "react";
import Loader from "../../../../other/loader/loader";
import FriendItem from "./friendItem/friendItem";
import addContactIcon from "../../../../../assets/icons/add_contact.svg";
import FloatButton from "../../../../other/floatButton/floatButton";
import {getFriendsList} from "../../../../../store/reducers/friendReducer";

const FriendsList = (props) => {

    const dispatch = useDispatch();
    const friendsList = useSelector(state => state.friends.friendsList?.items);
    const isLoading = useSelector(state => state.friends.isLoading);

    useEffect(() => {
        dispatch(getFriendsList())
    }, [])

    console.log(555, friendsList)

    return (
        <div className={"side-bar-component-container"}>
            <NavBack callback={() => dispatch(setViewChatList())} title={"Друзья"}/>
            <div className={"side-bar-content overflowY"}>
                    {
                        isLoading ? <Loader/> :
                            !friendsList ?
                                <div className={"side-bar-empty-content"}>
                                    У вас пока нет друзей
                                </div> :
                                friendsList.map((user) => <FriendItem {...user} key={user.id}/>)
                    }
                <FloatButton
                    icon={addContactIcon}
                    iconHeight={"28px"}
                    callback={() => dispatch(setViewUsersList())}
                />
            </div>

        </div>
    );
}

export default FriendsList;