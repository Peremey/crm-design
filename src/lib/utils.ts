export const copy = (obj: object) => {
    return JSON.parse(JSON.stringify(obj))
}

export const getDay = (date: Date) => {
    return (date.getDay() + 6) % 7
}