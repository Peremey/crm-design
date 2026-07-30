import { isValidRussianMobile, required, isEmail, isNumber, isFloatNumber, maxLength, equalLength, isName, isLatLng } from ".";
import { createValidator } from "./createValidator";

export const useValidators = (create: ReturnType<typeof createValidator>) => {

    const vNoEmpty = create([
        required()
    ], 'Нужно заполнить поле')

    const vPhone = create([
        required(),
        isValidRussianMobile()
    ], 'Нужен мобильный номер РФ')

    const vPhoneEmpty = create([
        isValidRussianMobile()
    ], 'Нужен мобильный номер РФ')

    const vEmail = create([
        isEmail()
    ], "Неправильный формат email")

    const vEmailNoEmpty = create([
        isEmail(),
        required()
    ], "Неправильный формат email")

    const vNumber = create([
        isNumber(),
    ], "Это цифровое поле")

    const vFloat = create([
        isFloatNumber(),
    ], "Допустимы только положительные числа")

    const vMaxL = (length: number, isRequired: boolean = false) => {
        return create([
            maxLength(length),
        ],
            `Длина поля - не более ${length} символов`
            , isRequired)
    }

    const vEqualL = (length: number, isRequired: boolean = false) => {
        return create([
            equalLength(length),
        ],
            `Длина поля - ровно ${length} символов`
            , isRequired)
    }

    const vName = create([
        isName(),
    ], "Некорректное имя")

    const vNameRequired = create([
        required(),
        isName(),
    ], "Некорректное имя")

    const vLatLng = create([
        isLatLng(),
    ], "Неверный формат координат")

    return { vPhone, vPhoneEmpty, vEmail, vNoEmpty, vNumber, vFloat, vMaxL, vEqualL, vEmailNoEmpty, vName, vLatLng, vNameRequired }
}