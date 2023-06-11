import "./usersSearch.css";
import searchIcon from "../../../../../assets/icons/search.svg";
import {useDispatch, useSelector} from "react-redux";
import {setSearchString} from "../../../../../store/reducers/userReducer";

const UsersSearch = (props) => {

    const dispatch = useDispatch();
    const searchString = useSelector(state => state.user.searchString);

    const onChange = (event) => {
        dispatch(setSearchString(event.target.value))
    }

    return (
        <div className={"users-search"}>
            <img alt={""} src={searchIcon}/>
            <input placeholder={"Search"} value={searchString} onChange={onChange}/>
        </div>
    );
}

export default UsersSearch;