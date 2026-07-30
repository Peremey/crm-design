import { type IMask } from "../types";

export const phoneMask: IMask = {
    mask(value: string) {
        let digits = value.replace(/\D/g, '')
        let masked = ''
        const hasPlus = value.trim().startsWith('+')
        if (digits.startsWith('7') || digits.startsWith('8')) {
            masked = (hasPlus ? '+' : '+') + '7'
            if (digits.length > 1) masked += ' (' + digits.slice(1, 4)
            if (digits.length >= 5) masked += ') ' + digits.slice(4, 7)
            if (digits.length >= 8) masked += ' - ' + digits.slice(7, 9)
            if (digits.length >= 10) masked += ' - ' + digits.slice(9, 11)
        } else if (hasPlus) {
            masked = '+' + digits
        } else {
            masked = value
        }
        return masked
    },

    unmask(value: string) {
        let res = ''
        if (value != '')
            res += "+"
        return res + value.replace(/\D/g, '').slice(0, 11)
    }
}

export const tgMask: IMask = {
    mask(value: string) {
        if (!value) return ''
        let v = value.trim()
        if (!v.startsWith('@'))
            v = '@' + v
        v = v.replace(/[^@a-zA-Z0-9_]/g, '')
        v = '@' + v.slice(1).replace(/@/g, '')
        v = v.slice(0, 33)
        return v
    },

    unmask(value: string) {
        return value.replace(/^@{2,}/, '@')
            .replace(/[^@a-zA-Z0-9_]/g, '')
            .replace(/(?!^@)[@]/g, '')
            .slice(0, 33)
    }
}

export const numbersMask: IMask = {
    mask(value: string) {
        return value.replace(/\D/g, '')
    },

    unmask(value: string) {
        return this.mask(value)
    }
}

export const latLngMask: IMask = {
    mask(value: string) {
        if (!value) return ''

        let v = value.trim()

        // только цифры и точка
        v = v.replace(/[^0-9.]/g, '')

        // только одна точка
        const parts = v.split('.')
        if (parts.length > 2) {
            v = parts[0] + '.' + parts.slice(1).join('')
        }

        // до 6 знаков после точки
        const [intPart, fracPart] = v.split('.')
        if (fracPart !== undefined) {
            v = intPart + '.' + fracPart.slice(0, 6)
        }

        // ограничим длину целой части (до 3 цифр)
        const [intN, fracN] = v.split('.')
        const limitedInt = intN?.slice(0, 3)
        v = limitedInt + (fracN !== undefined ? '.' + fracN : '')

        return v
    },

    unmask(value: string) {
        return this.mask(value)
    }
}