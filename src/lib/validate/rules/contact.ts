export const isValidRussianMobile = () => {
    return (value: string) => {
        if (value == '')
            return true
        return /^\+(7|8)9\d{9}$/.test(value)
    }
}

export const isEmail = () => {
    return (value: string) => {
        if (value == '')
            return true
        return /^(?![.])(?!.*[.]{2})[a-zA-Z0-9.!#$%&'*+?^_`{|}~-]+(?<![.])@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/.test(value);
    }
};

export const isTg = () => {
    return (value: string) => {
        if (value == '')
            return true;
        return /^@?(?!\d+$)[a-zA-Z0-9_]{5,32}$/.test(value);
    }
}

export const isLatLng = () => {
    return (value: string) => {
        if (value == '')
            return true
        return /^-?(?:90(?:\.0{1,6})?|(?:[0-8]?\d)(?:\.\d{1,6})?)$|^-?(?:180(?:\.0{1,6})?|(?:1[0-7]\d|\d?\d)(?:\.\d{1,6})?)$/.test(value)
    }
}