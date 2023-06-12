
export const validators = {
    required: "Обязательное поле",
    maxLengthFullname: 80,
    maxLengthPassword: 32,
    maxLengthPhoneNumber: 20,
    fullNamePattern: {
        value: /^([А-ЯA-Z][а-яa-zА-ЯA-Z\-]+\s?){2,}\s*$/,
        message: "Неправильный формат ФИО"
    },
    emailPattern: {
        value: /^[a-zA-Z1-9\-._]+@[a-z1-9]+(.[a-z1-9]+)+$/,
        message: "Неправильный формат email"
    },
    passwordPattern: {
        value: /\d/,
        message: "Пароль должен содержать хотя бы одну цифру"
    },
    maxBirthDate: {
        value: new Date().toISOString().slice(0, 10),
        message: "Вы физически не могли родиться"
    },
    minBirthDate: {
        value: "1923-01-01",
        message: "Вы слишком стары для этого"
    },
    minPasswordLength: {
        value: 8,
        message: "Длина пароля должна быть более 8 символов"
    }
}