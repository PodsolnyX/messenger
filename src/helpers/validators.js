export const required = (value) => {
    return value ? undefined : "Обязательное поле";
}

export const maxLength = (maxLength) => (value) => {
    return value.length <= maxLength ? undefined : `Длина поля не более ${maxLength} символов`;
}

export const minLength = (minLength) => (value) => {
    return value.length <= minLength ? undefined : `Длина поля не менее ${minLength} символов`;
}

export const correctEmail = (value) => {
    return /^[a-zA-Z1-9\-\._]+@[a-z1-9]+(.[a-z1-9]+)+$/.test(value) ? undefined : `Некорректный формат email`;
}

export const correctFullName = (value) => {
    return /^([А-ЯA-Z][а-яa-zА-ЯA-Z\-]+\s?){2,}\s*$/.test(value) ? undefined : `Некорректный формат имени`;
}