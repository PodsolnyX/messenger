import {useResizeDetector} from "react-resize-detector";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {setIsMobile, setMobileRef, setViewChatList, setViewMessagesArea} from "../store/reducers/generalReducer";

export function useMobile() {
    const { width, ref } = useResizeDetector();
    const dispatch = useDispatch();
    const { chatId } = useParams()
    const isMobile = useSelector(state => state.general.isMobile)

    useEffect(() => {
        dispatch(setMobileRef(ref))
    }, [ref])

    useEffect(() => {
        if (width <= 800 && !isMobile) {
            dispatch(setIsMobile(true));
        }
        else if (width > 800 && isMobile) {
            dispatch(setIsMobile(false));
        }
    }, [width])

    useEffect(() => {

        if (isMobile && chatId) {
            dispatch(setViewMessagesArea());
        }
        else if (!isMobile && chatId) {
            dispatch(setViewChatList());
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile && chatId) {
            dispatch(setViewMessagesArea());
        }
        else if (isMobile) {
            dispatch(setViewChatList());
        }
    }, [chatId])

}