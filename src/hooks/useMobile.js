import {useResizeDetector} from "react-resize-detector";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setIsMobile, setMobileRef} from "../store/reducers/generalReducer";

export function useMobile() {
    const { width, ref } = useResizeDetector();
    const dispatch = useDispatch();
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

}