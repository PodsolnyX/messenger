import {connect} from "react-redux";
import LoginPage from "./loginPage";
import {loginUser} from "../../../store/reducers/userReducer";

let mapStateToProps = (state) => {
    return {
        isLoading: state.user.isLoading
    };
}

export default connect(mapStateToProps, {
    loginUser
})(LoginPage);