import {connect} from "react-redux";
import RegistrationPage from "./registrationPage";
import {registerUser} from "../../../store/reducers/userReducer";

let mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading
    };
}

export default connect(mapStateToProps, {
    registerUser
})(RegistrationPage);