const
    SET_SUCCESS = "SET_SUCCESS",
    SET_ERROR = "SET_ERROR",
    SET_WAS_SHOW = "SET_WAS_SHOW"
;

const
    TOAST_SUCCESS = "TOAST_SUCCESS",
    TOAST_ERROR = "TOAST_ERROR"
;

let initialState = {
    message: false,
    isWasShow: true,
    toastType: TOAST_SUCCESS
};

const toasterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUCCESS:
            return {
                ...state,
                message: action.message,
                toastType: TOAST_SUCCESS,
                isWasShow: false
            };
        case SET_ERROR:
            return {
                ...state,
                message: action.message,
                toastType: TOAST_ERROR,
                isWasShow: false
            };
        case SET_WAS_SHOW:
            return {
                ...state,
                isWasShow: true
            };
        default:
            return state;
    }
}


export const setSuccessToast = (message) => ({type: SET_SUCCESS, message});
export const setErrorToast = (message) => ({type: SET_ERROR, message});
export const setWasShow = () => ({type: SET_WAS_SHOW})


export default toasterReducer;
