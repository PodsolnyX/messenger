import {connect} from "react-redux";
import Toaster from "./toaster";
import {setWasShow} from "../../../store/reducers/toasterReducer";

let mapStateToProps = (state) => {
    return {
        message: state.toaster.message,
        toastType: state.toaster.toastType,
        isWasShow: state.toaster.isWasShow
    };
}

export default connect(mapStateToProps, {
    setWasShow
})(Toaster);