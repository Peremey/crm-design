export const isDigits = () => {
    return (value: string) => /\d/.test(value)
}

export const isNumber = () => {
    return (value: string) => {
        if (value == '')
            return true
        return /^[1-9]\d*$/.test(value)
    }
}

export const isFloatNumber = () => {
    return (value: string) => {
        if (value == '')
            return true
        const num = Number(value)
        return Number.isFinite(num)
    }
}

// подходит для пар номеров и дат
export const isSmaller = (valueEnd?: string) => {
    return (value: string) => {
        if (value && valueEnd) {
            if (isNumber()(value)) {
                return Number(value) <= Number(valueEnd)
            } else {
                return new Date(value) <= new Date(valueEnd)
            }
        }
        return true
    }
}