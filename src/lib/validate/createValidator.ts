import type { IError } from "./types"
import type { FormErrorState } from './formErrorState'
import { required } from "./rules"

export type ValidationRule = (value: string) => boolean

export const createValidator = (
    formErrorState: FormErrorState
) => {
    return (rules: ValidationRule[], message: string, isRequired?: boolean) => {

        return (value: string, fieldId: string): IError => {
            if (isRequired)
                rules.push(required())
            const isError = rules.some(rule => !rule(value))
            formErrorState.update(isError, fieldId)

            return {
                isError,
                message: isError ? message : ''
            }
        }
    }
}

