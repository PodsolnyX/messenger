import {instance} from "./instance";

const uploadFile = (formData, fileType, isPublic) => {
    return instance.post(`/files?fileType=${fileType}&isPublic=${isPublic}`,
        formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    )
        .then(response =>  response)
        .catch(error => error.response);
}

export const filesAPI = {
    uploadFile
};