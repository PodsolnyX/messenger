import "./usersList.css"
import NavBack from "../../../other/navBack/navBack";
import UsersSearch from "./usersSearch/usersSearch";
import {useDispatch, useSelector} from "react-redux";
import { setViewFriendsList} from "../../../../store/reducers/generalReducer";
import UserItem from "./userItem/userItem";
import {useEffect} from "react";
import {getUserList} from "../../../../store/reducers/userReducer";
import Loader from "../../../other/loader/loader";


const UsersList = (props) => {

    const dispatch = useDispatch();
    const usersList = useSelector(state => state.user.usersList?.items);
    const isLoading = useSelector(state => state.user.isLoading);
    const searchString = useSelector(state => state.user.searchString);

    useEffect(() => {
        dispatch(getUserList(searchString))
    }, [searchString])

    return (
        <div className={"users-list-container"}>
            <NavBack callback={() => dispatch(setViewFriendsList())}>
                <UsersSearch/>
            </NavBack>
            <div className={"users-list"}>
                {
                    isLoading ? <Loader/> :
                        !usersList ?
                            <div className={"empty-user-list"}>
                                Пользователи с таким именем не найдены
                            </div> :
                            usersList.map((user) => <UserItem {...user} key={user.id}/>)
                }
            </div>
        </div>
    );
}

export default UsersList;