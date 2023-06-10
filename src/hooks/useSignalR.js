import * as signalR from "@microsoft/signalr";
import {useEffect, useState} from "react";
import {useAuth} from "./useAuth";

export function useSignalR() {

    const user = useAuth();
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

                connection.on('ReceiveMessage', function (message) {
                    console.log(JSON.parse(message));
                });


            }).catch(function (err) {
                return console.error(err.toString());
            });
        }
    }, [connection])
}