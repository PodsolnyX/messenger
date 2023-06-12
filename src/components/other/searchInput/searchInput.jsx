import "./searchInput.css";
import searchIcon from "./../../../assets/icons/search.svg"
import {useDispatch} from "react-redux";
import Icon from "../icon/icon";

const SearchInput = (props) => {

    const dispatch = useDispatch();

    const onChange = (event) => {
        dispatch(props.setSearchString(event.target.value))
    }

    return (
        <div className={"search-input"}>
            <Icon icon={searchIcon} size={18}/>
            <input placeholder={"Search"} value={props.searchString} onChange={onChange} maxLength={80}/>
        </div>
    );
}

export default SearchInput;