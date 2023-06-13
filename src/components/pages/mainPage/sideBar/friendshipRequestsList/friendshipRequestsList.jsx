import NavBack from "../../../../other/navBack/navBack";
import {useDispatch, useSelector} from "react-redux";
import {setViewFriendsList} from "../../../../../store/reducers/generalReducer";
import {useEffect} from "react";
import Loader from "../../../../other/loader/loader";
import FriendshipRequestsItem from "./friendshipRequestsItem/friendshipRequestsItem";
import {
    acceptFriendshipRequest,
    getFriendshipRequests,
    rejectFriendshipRequest, setIsUserRequests
} from "../../../../../store/reducers/friendReducer";
import SelectInput from "../../../../other/selectInput/selectInput";
import {USER_REQUESTS_OPTIONS} from "../../../../../helpers/constants";

const FriendshipRequestsList = (props) => {

    const dispatch = useDispatch();
    const friendsList = useSelector(state => state.friends.friendsList);
    const isUserRequests = useSelector(state => state.friends.isUserRequests);
    const isLoading = useSelector(state => state.friends.isLoading);

    useEffect(() => {
        dispatch(getFriendshipRequests(isUserRequests))
    }, [isUserRequests])

    const onAccept = (userId) => {
        dispatch(acceptFriendshipRequest(userId))
    };

    const onReject = (userId) => {
        dispatch(rejectFriendshipRequest(userId));
    }

    return (
        <div className={"side-bar-component-container"}>
            <NavBack callback={() => dispatch(setViewFriendsList())} title={"Заявки в друзья"}>
                <div className={"friends-note-container"}>
                    <SelectInput
                        callback={(value) => dispatch(setIsUserRequests(value))}
                        value={isUserRequests}
                        options={USER_REQUESTS_OPTIONS}
                    />
                </div>
            </NavBack>
            <div className={"side-bar-content overflowY"}>
                    {
                        isLoading ? <Loader/> :
                            friendsList.length === 0 ?
                                <div className={"side-bar-empty-content"}>
                                    Заявок нет
                                </div> :
                                friendsList.map((user) =>
                                    <FriendshipRequestsItem {...user} key={user.id}
                                                            isUserRequests={isUserRequests}
                                                            onAccept={onAccept}
                                                            onReject={onReject}
                                    />
                                )
                    }
            </div>

        </div>
    );
}

export default FriendshipRequestsList;