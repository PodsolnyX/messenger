import { PulseLoader} from "react-spinners";
import "./loader.css"

const Loader = () => {
    return (
        <div className={"loader-container"}>
            <PulseLoader
                color="#abbbc9"
                size={10}
                speedMultiplier={0.5}
            />
        </div>

    );
}

export default Loader;