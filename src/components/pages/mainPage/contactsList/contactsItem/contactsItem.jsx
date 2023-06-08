import "./contactsItem.css"

const ContactsItem = (props) => {
    return (
        <div className={"contact-item-container"}>
            <div className={"contact-item-avatar"}>
                <img alt={""} src={props.image}/>
            </div>
            <div className={"contact-item-description"}>
                <div className={"contact-item-info"}>
                    <div className={"text-primary"} style={{fontSize: "14px"}}>{props.name}</div>
                    <div className={"text-tertiary"}>{props.time}</div>
                </div>
                <div className={"contact-item-details"}>
                    <div className={"text-secondary text-message"} style={{fontSize: "14px"}}>{props.message}</div>
                    {
                        props.count > 0 &&
                        <div className={"contact-item-messages-count"}>{props.count}</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ContactsItem;