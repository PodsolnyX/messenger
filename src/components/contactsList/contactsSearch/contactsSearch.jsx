import "./contactsSearch.css";
import searchIcon from "./../../../assets/icons/search.svg";

const ContactsSearch = (props) => {
    return (
        <div className={"contacts-search"}>
            <img alt={""} src={searchIcon}/>
            <input placeholder={"Search"}/>
        </div>
    );
}

export default ContactsSearch;