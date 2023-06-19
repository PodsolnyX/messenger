export const FILE_TYPE = {
    UNKNOWN: "Unknown",
    TEXT: "Text",
    IMAGE: "Image",
    AUDIO: "Audio",
    VIDEO: "Video",
    APPLICATION: "Application",
    ARCHIVE: "Archive"
}

export const FILE_TYPE_RATIO = {
    "image": FILE_TYPE.IMAGE,
    "text": FILE_TYPE.TEXT,
    "application": FILE_TYPE.APPLICATION,
    "audio": FILE_TYPE.AUDIO,
    "video": FILE_TYPE.VIDEO,
    "archive": FILE_TYPE.ARCHIVE
}

export const VIEWS = {
    PROFILE: "VIEW_PROFILE",
    CHATS_LIST: "CHATS_LIST",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    EDIT_PROFILE: "EDIT_PROFILE",
    USERS_LIST: "USERS_LIST",
    FRIENDS_LIST: "FRIENDS_LIST",
    CREATE_GROUP_CHAT: "CREATE_GROUP_CHAT",
    FRIENDSHIP_REQUESTS_LIST: "FRIENDSHIP_REQUESTS_LIST",
    EMPTY_MAIN_BAR: "EMPTY_MAIN_BAR",
    MESSAGES_AREA: "MESSAGES_AREA",
    CHAT_SETTINGS: "CHAT_SETTINGS"
};

export const ONLINE_PREFERENCE_TYPE = {
    NOBODY: "Nobody",
    FRIENDS: "Friends",
    EVERYONE: "Everyone"
}

export const ONLINE_PREFERENCE_OPTIONS = [
    {value: "Nobody", title: "Никому"},
    {value: "Friends", title: "Друзьям"},
    {value: "Everyone", title: "Всем"}
]

export const NOTIFICATION_PREFERENCE_OPTIONS = [
    {value: "Nothing", title: "Выключены"},
    {value: "All", title: "Включены"}
]

export const MESSAGE_TYPES = {
    NEW_MESSAGE: "NewMessage",
    NEW_MESSAGE_MUTED: "NewMessageMuted",
    NEW_REACTION: "NewReaction",
    USER_ONLINE: "UserOnline",
    USER_OFFLINE: "UserOffline",
    NEW_FRIENDSHIP_REQUEST: "NewFriendshipRequest",
    FRIENDSHIP_ACCEPTING: "FriendshipAccepting",
    FRIENDSHIP_REJECTING: "FriendshipRejecting",
    CHAT_CREATED: "ChatCreated",
    NEW_AUDIO_CALL: "NewAudioCall",
    NEW_VIDEO_CALL: "NewVideoCall",
    CALL_REJECTING: "CallRejecting"
}

export const NUMBER_MESSAGE_TYPES_RATIO = {
    0: MESSAGE_TYPES.NEW_MESSAGE,
    1: MESSAGE_TYPES.NEW_MESSAGE_MUTED,
    2: MESSAGE_TYPES.NEW_REACTION,
    3: MESSAGE_TYPES.USER_ONLINE,
    4: MESSAGE_TYPES.USER_OFFLINE,
    5: MESSAGE_TYPES.NEW_FRIENDSHIP_REQUEST,
    6: MESSAGE_TYPES.FRIENDSHIP_ACCEPTING,
    7: MESSAGE_TYPES.FRIENDSHIP_REJECTING,
    8: MESSAGE_TYPES.CHAT_CREATED,
    9: MESSAGE_TYPES.NEW_AUDIO_CALL,
    10: MESSAGE_TYPES.NEW_VIDEO_CALL,
    11: MESSAGE_TYPES.CALL_REJECTING
}

export const USER_REQUESTS_OPTIONS = [
    {value: "false", title: "Входящие"},
    {value: "true", title: "Исходящие"}
]

export const SIZE_MESSAGE_PAGE = 50;

export const NULL_PHOTO = "00000000-0000-0000-0000-000000000000";
export const NULL_NAME = "NULL";