import {Slide, toast} from "react-toastify";

export const toastSuccess = (text) => {
    toast.dismiss();
    toast.success(text, {autoClose: 1000, closeButton: false});
}

export const toastInfo = (text) => {
    toast.dismiss();
    toast.info(text, {autoClose: 2000, closeButton: false});
}

export const toastError = (text) => {
    toast.dismiss();
    toast.error(text, {autoClose: 2000, closeButton: false});
}