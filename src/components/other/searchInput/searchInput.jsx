import "./searchInput.css";
import searchIcon from "./../../../assets/icons/search.svg"
import {useDispatch} from "react-redux";

const SearchInput = (props) => {

    const dispatch = useDispatch();

    const onChange = (event) => {
        dispatch(props.setSearchString(event.target.value))
    }

    return (
        <div className={"search-input"}>
            <img alt={""} src={searchIcon}/>
            <input placeholder={"Search"} value={props.searchString} onChange={onChange}/>
        </div>
    );
}

export default SearchInput;