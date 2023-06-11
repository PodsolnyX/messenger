import {filesAPI} from "../../api/filesAPI";
import {setErrorToast, setSuccessToast} from "./toasterReducer";
import {convertFileToFormData} from "../../helpers/helpers";

const SET_LAST_UPLOAD_FILE_ID = "SET_LAST_UPLOAD_FILE_ID"

let initialState = {
    lastUploadFileId: null
};

const filesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LAST_UPLOAD_FILE_ID:
            return {
                ...state,
                lastUploadFileId: action.id
            }
        default:
            return state;
    }
}

export const setLastUploadFileId = (id) => ({type: SET_LAST_UPLOAD_FILE_ID, id});

export const uploadFile = (file, fileType, isPublic) => (dispatch) => {

    const formData = convertFileToFormData(file);

    filesAPI.uploadFile(formData, fileType, isPublic)
        .then(response => {
            if (response.status === 200) {
                dispatch(setLastUploadFileId(response.data))
                dispatch(setSuccessToast("Файл успешно загружен"))
            }
            else
                dispatch(setErrorToast("Файл не удалось загрузить"))
        })
}

export default filesReducer;