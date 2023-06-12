import "./usersList.css"
import NavBack from "../../../../other/navBack/navBack";
import {useDispatch, useSelector} from "react-redux";
import { setViewFriendsList} from "../../../../../store/reducers/generalReducer";
import UserItem from "./userItem/userItem";
import {useEffect} from "react";
import {getUserList, setUserSearchString} from "../../../../../store/reducers/userReducer";
import Loader from "../../../../other/loader/loader";
import SearchInput from "../../../../other/searchInput/searchInput";


const UsersList = (props) => {

    const dispatch = useDispatch();
    const usersList = useSelector(state => state.user.usersList?.items);
    const isLoading = useSelector(state => state.user.isLoading);
    const searchString = useSelector(state => state.user.searchString);

    useEffect(() => {
        dispatch(getUserList(searchString))
    }, [searchString])

    return (
        <div className={"side-bar-component-container"}>
            <NavBack callback={() => dispatch(setViewFriendsList())}>
                <SearchInput searchString={searchString} setSearchString={setUserSearchString}/>
            </NavBack>
            <div className={"side-bar-content overflowY"}>
                {
                    isLoading ? <Loader/> :
                        !usersList ?
                            <div className={"side-bar-empty-content"}>
                                Пользователи с таким именем не найдены
                            </div> :
                            usersList.map((user) => <UserItem {...user} key={user.id}/>)
                }
            </div>
        </div>
    );
}

export default UsersList;