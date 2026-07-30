export interface IError {
    isError: boolean,
    message: string
}

export interface IMask {
    mask(value: string): string
    unmask(value: string): string
}