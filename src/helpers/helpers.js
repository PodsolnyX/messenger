import {NULL_PHOTO} from "./constants";

export function convertFileToFormData(file) {
    const formData = new FormData();
    formData.append("formFile", file);
    return formData;
}

export function getUserAvatar(photoId) {
    if (photoId === NULL_PHOTO || photoId === undefined)
        return `https://acrohappiness.ru/assets/img/comment.jpg`
    return `http://chat.markridge.space/api/files/${photoId}?attachment=false&access_token=${localStorage.getItem("accessToken")}`;
}

export function getFileLinkToDownload(fileId) {
    return `http://chat.markridge.space/api/files/${fileId}?attachment=true&access_token=${localStorage.getItem("accessToken")}`;
}

export function getQueryFromIdList(idList) {
    let query = "";
    idList.forEach((id) => {
        query += `userIds=${id}&`
    })

    return query.substring(0, query.length - 1);;
}