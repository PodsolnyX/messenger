export function convertFileToFormData(file) {
    const formData = new FormData();
    formData.append("formFile", file);
    return formData;
}

export function getUserAvatar(photoId) {
    return `http://chat.markridge.space/api/files/${photoId}?attachment=false&access_token=${localStorage.getItem("accessToken")}`;
}