import "./messagesArea.css"
import MessageInput from "./messageInput/messageInput";
import MessageItem from "./messageItem/messageItem";

const MessagesArea = (props) => {

    const data=[
        {
            text: "Разнообразный и богатый опыт выбранный нами инновационный путь позволяет выполнить важнейшие задания по разработке соответствующих условий активизации! Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции создаёт предпосылки качественно новых шагов для модели развития?",
            isIncoming: true
        },
        {
            text: "Привет, как дела?",
            isIncoming: true
        },
        {
            text: "Привет, как дела?",
            isIncoming: false
        },
        {
            text: "Привет, как дела?",
            isIncoming: true
        },
        {
            text: "Привет, как дела?",
            isIncoming: false
        },
        {
            text: "Привет, как дела?",
            isIncoming: true
        },
        {
            text: "Привет, как дела? Нормально нормально не реально реально не реально",
            isIncoming: true
        },
        {
            text: "Привет, как дела?",
            isIncoming: true
        },
        {
            text: "Привет, как дела?",
            isIncoming: false
        },
        {
            text: "Разнообразный и богатый опыт выбранный нами инновационный путь позволяет выполнить важнейшие задания по разработке соответствующих условий активизации! Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции создаёт предпосылки качественно новых шагов для модели развития?",
            isIncoming: false
        },
    ]

    return (
        <div className={"messages-area"}>
            <div className={"messages-list-container"}>
                <div className={"messages-list"}>
                    {
                        data.map((message, i) =>
                            <MessageItem text={message.text} isIncoming={message.isIncoming} key={i + "34343"}/>
                        )
                    }
                </div>
            </div>
            <div className={"input-container"}>
                <MessageInput/>
            </div>
        </div>
    );
}

export default MessagesArea;