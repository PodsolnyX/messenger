import * as signalR from "@microsoft/signalr";
import {useEffect, useState} from "react";
import {useAuth} from "./useAuth";
import {MESSAGE_TYPES, NUMBER_MESSAGE_TYPES_RATIO} from "../helpers/constants";
import {useDispatch} from "react-redux";
import {getChatMessages, getPreviewChats} from "../store/reducers/chatReducer";
import {useParams} from "react-router-dom";

export function useSignalR() {

    const user = useAuth();
    const dispatch = useDispatch();
    const params = useParams();
    const [connection, setConnection] = useState(null);

    useEffect(() => {
        if (user.isAuth) {
            const newConnection = new signalR.HubConnectionBuilder()
                .withUrl("http://chat.markridge.space/api/notification/hub", {
                    accessTokenFactory: () => {
                        return localStorage.getItem("accessToken")
                    }
                })
                .withAutomaticReconnect([0, 2, 10, 30, 60, 180, 300, 360])
                .build();

            setConnection(newConnection);
        }
        else {
            setConnection(null);
        }

    }, [user.isAuth])

    useEffect(() => {
        if (connection) {
            connection.start().then(function () {

                console.log("Connected to signalr")
                console.log(444, params)

                connection.on('ReceiveMessage', function (message) {

                    const newMessage = JSON.parse(message)
                    console.log(newMessage);

                    switch (NUMBER_MESSAGE_TYPES_RATIO[newMessage.Type]) {
                        case MESSAGE_TYPES.NEW_MESSAGE:
                            dispatch(getPreviewChats());
                            // console.log(444, params)
                            // if (params.chatId === newMessage.ChatId)
                                dispatch(getChatMessages(newMessage.ChatId))
                            break;
                        default:
                            break;
                    }
                });


            }).catch(function (err) {
                return console.error(err.toString());
            });
        }
    }, [connection])
}