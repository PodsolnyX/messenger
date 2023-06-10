const
    SET_VIEW_PROFILE = "SET_VIEW_PROFILE",
    SET_VIEW_CONTACTS = "SET_VIEW_CONTACTS",
    SET_VIEW_CHANGE_PASSWORD = "SET_VIEW_CHANGE_PASSWORD",
    SET_VIEW_EDIT_PROFILE = "SET_VIEW_EDIT_PROFILE"
;

export const VIEWS = {
    PROFILE: "VIEW_PROFILE",
    CONTACTS: "VIEW_CONTACTS",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    EDIT_PROFILE: "EDIT_PROFILE"
};

let initialState = {
    currentView: VIEWS.CONTACTS
};

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEW_PROFILE:
            return {
                ...state,
                currentView: VIEWS.PROFILE
            };
        case SET_VIEW_CONTACTS:
            return {
                ...state,
                currentView: VIEWS.CONTACTS
            };
        case SET_VIEW_CHANGE_PASSWORD:
            return {
                ...state,
                currentView: VIEWS.CHANGE_PASSWORD
            };
        case SET_VIEW_EDIT_PROFILE:
            return {
                ...state,
                currentView: VIEWS.EDIT_PROFILE
            };
        default:
            return state;
    }
}

export const setViewProfile = () => ({type: SET_VIEW_PROFILE});
export const setViewContacts = () => ({type: SET_VIEW_CONTACTS});
export const setViewChangePassword = () => ({type: SET_VIEW_CHANGE_PASSWORD});
export const setViewEditProfile = () => ({type: SET_VIEW_EDIT_PROFILE});

export default generalReducer;