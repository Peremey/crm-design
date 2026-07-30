export const minLength = (length: number) => {
    // нельзя модифицировать проверкой на ''
    return (value: string) => value.length >= length
}

export const required = () => {
    return minLength(1)
}

export const maxLength = (length: number) => {
    return (value: string) => value.length <= length
}

export const equalLength = (length: number) => {
    return (value: string) => {
        if (value == '')
            return true
        return value.length == length
    }
}

export const isLowerCase = () => {
    return (value: string) => /[a-zа-яё]/.test(value);
}

export const isUpperCase = () => {
    return (value: string) => /[A-ZА-ЯЁ]/.test(value);
}

export const isName = () => {
    return (value: string) => /^[A-Za-zА-Яа-яЁё]+(?:[ -][A-Za-zА-Яа-яЁё]+)?$/.test(value);
}