const
    SET_VIEW_PROFILE = "SET_VIEW_PROFILE",
    SET_VIEW_CONTACTS = "SET_VIEW_CONTACTS"
;

export const VIEWS = {
    PROFILE: "VIEW_PROFILE",
    CONTACTS: "VIEW_CONTACTS",
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
        default:
            return state;
    }
}

export const setViewProfile = () => ({type: SET_VIEW_PROFILE});
export const setViewContacts = () => ({type: SET_VIEW_CONTACTS});

export default generalReducer;