import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import {toastError, toastSuccess} from "../../../helpers/toaster";


const Toaster = (props) => {

    useEffect(() => {
        if (!props.isWasShow && props.toastType === "TOAST_SUCCESS") {
            toastSuccess(props.message);
            props.setWasShow();
        }
        else if (!props.isWasShow && props.toastType === "TOAST_ERROR") {
            toastError(props.message);
            props.setWasShow();
        }

    }, [props.isWasShow])

    return (
        <div>
            <ToastContainer/>
        </div>
    )
}

export default Toaster;