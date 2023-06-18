import "./createGroupChat.css"
import Navbar from "../../../../other/navbar/navbar";
import {setViewFriendsList} from "../../../../../store/reducers/generalReducer";
import {getFileLinkToView} from "../../../../../helpers/helpers";
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";
import {Input} from "../../../../other/input/input";
import {useForm} from "react-hook-form";
import CreateGroupChatItem from "./createGroupChatItem/createGroupChatItem";
import {validators} from "../../../../../helpers/validators";
import {setInformationToast} from "../../../../../store/reducers/toasterReducer";
import {createGroupChat} from "../../../../../store/reducers/chatReducer";

const CreateGroupChat = (props) => {

    const dispatch = useDispatch();
    const friendsList = useSelector(state => state.friends.friendsList);
    const isLoading = useSelector(state => state.chat.isLoading)

    const ref = useRef();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [groupChatUsers, setGroupChatUsers] = useState([]);
    const [chatAvatar, setChatAvatar] = useState(null);

    const onChangeAvatar = (event) => {
        setChatAvatar(event.target.files[0])
        if (event.target.files[0])
            ref.current.src =  URL.createObjectURL(event.target.files[0])
        else
            ref.current.src = getFileLinkToView(undefined)
    }

    const onChange = (event) => {
        if (event.target.checked && !groupChatUsers.includes(event.target.id)) {
            setGroupChatUsers([...groupChatUsers, event.target.id])
        }else {
            setGroupChatUsers([...groupChatUsers.filter(id => id !== event.target.id)]);
        }
    }

    const onSubmit = (formData) => {
        if (groupChatUsers.length === 0) {
            dispatch(setInformationToast("В чате должен быть хотя бы один пользователь"))
            return
        }
        dispatch(createGroupChat(groupChatUsers, chatAvatar ,formData.chatName))
    }

    return (
        <div className={"side-bar-component-container"}>
            <Navbar title={"Создание группового чата"} callback={() => dispatch(setViewFriendsList())}/>
            <div className={"side-bar-content"}>
                <div className={"edit-profile-avatar"}>
                    <input type={"file"} id="avatar-input" onChange={onChangeAvatar}
                           accept="image/png, image/gif, image/jpeg"/>
                    <label htmlFor="avatar-input">
                        <img ref={ref} src={getFileLinkToView(undefined)} alt=""/>
                    </label>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className={"create-group-chat-container"}>
                    <div>
                        <label htmlFor="chatName">Название чата</label>
                        <Input register={register} name={"chatName"} errors={errors}
                               options={{
                                   required: validators.required
                               }}
                        />
                    </div>
                    <div>
                        <label htmlFor={""}>Участники чата</label>
                        <div className={"create-group-chat-list-users"}>
                            {
                                friendsList.map(user => <CreateGroupChatItem key={user.id} {...user} onChange={onChange}/>)
                            }
                        </div>
                    </div>
                    <button disabled={isLoading}>Создать чат</button>
                </form>
            </div>
        </div>
    );
}

export default CreateGroupChat;