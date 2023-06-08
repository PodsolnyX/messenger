import "./contactsList.css"
import ContactsSearch from "./contactsSearch/contactsSearch";
import ContactsItem from "./contactsItem/contactsItem";
import avatar from "../../../../assets/images/avatar.png"
import avatar2 from "../../../../assets/images/avatar2.png"
import avatar3 from "../../../../assets/images/avatar3.jpg"
import pencil from "../../../../assets/icons/pencil.svg"

const ContactsList = (props) => {

    const data = [
        {
            image: avatar,
            name: "Иванов Ваня",
            time: "10:34",
            count: 333,
            message: "Рандомный текст текст текст текст текст текст текст текст текст"
        },
        {
            image: avatar3,
            name: "Казеев Илья",
            time: "12:34",
            count: 2,
            message: "Острый соус - топ"
        },
        {
            image: avatar2,
            name: "Пупов Рома",
            time: "00:34",
            count: 6,
            message: "Пришли как-то биба и боба..."
        },
        {
            image: avatar,
            name: "Мищенко Паша",
            time: "15:33",
            count: 0,
            message: "Смотрел долгова???"
        },
        {
            image: avatar,
            name: "Задорнов Михаил",
            time: "09:34",
            count: 33,
            message: "Ну тупые!"
        },
        {
            image: avatar2,
            name: "Устименко Степан",
            time: "10:34",
            count: 1,
            message: "Купи сока"
        },
        {
            image: avatar,
            name: "Терехов Nван",
            time: "19:14",
            count: 3,
            message: "What you know about rolling down in the deep when you brain goes numb you can call to mental freez"
        },
        {
            image: avatar3,
            name: "Ромка",
            time: "08:34",
            count: 0,
            message: "ЗМЕЕВ!!09!!90!!!91!!9"
        },
        {
            image: avatar,
            name: "Мадам Брошкина",
            time: "04:20",
            count: 1,
            message: "Но мой поезд ушёл"
        }
    ]

    return (
        <div className={"contacts-list-container"}>
            <ContactsSearch/>
            <div className={"contacts"}>
                {
                    data.map((person, i) => <ContactsItem {...person} key={i}/>)
                }
                <div className={"write-message"}>
                    <img src={pencil} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default ContactsList;