import {Slide, toast} from "react-toastify";

export const toastSuccess = (text) => {
    toast.dismiss();
    toast.success(text, {autoClose: 1000, closeButton: false, transition: Slide, position: "bottom-right"});
}

export const toastInfo = (text) => {
    toast.info(text, {autoClose: false, closeButton: true, transition: Slide, position: "bottom-right"});
}

export const toastError = (text) => {
    toast.dismiss();
    toast.error(text, {autoClose: false, closeButton: true, transition: Slide, position: "bottom-right"});
}