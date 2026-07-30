export class FormErrorState {
    formErrorSet: Set<string> = new Set()

    update(isError: boolean, field: string) {
        isError ? this.formErrorSet.add(field) : this.formErrorSet.delete(field)
    }

    get isError(): boolean {
        return Boolean(this.formErrorSet.size)
    }
}