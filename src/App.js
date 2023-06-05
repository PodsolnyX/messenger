import './App.css';
import Navbar from "./components/navbar/navbar";
import MessagesArea from "./components/messagesArea/messagesArea";
import ContactsList from "./components/contactsList/contactsList";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <div className={"content"}>
                <ContactsList/>
                <MessagesArea/>
            </div>
        </div>
    );
}

export default App;
