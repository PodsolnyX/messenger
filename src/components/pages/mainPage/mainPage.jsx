import "./mainPage.css"
import MessagesArea from "./messagesArea/messagesArea";
import ContactsList from "./contactsList/contactsList";
import Navbar from "../../other/navbar/navbar";

const MainPage = (props) => {
    return (
        <div>
            <Navbar/>
            <div className={"content"}>
                <ContactsList/>
                <MessagesArea/>
            </div>
        </div>

    );
}

export default MainPage;