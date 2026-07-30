import { FormErrorState } from "./formErrorState"
import { createValidator } from "./createValidator"
import { useValidators } from "./useValidators"

export const useValidate = (formErrorState = new FormErrorState()) => {
    const create = createValidator(formErrorState)

    return {
        formErrorState,
        create,
        ...useValidators(create)
    }
}