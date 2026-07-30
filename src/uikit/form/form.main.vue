<script setup lang="ts">
interface IProps {
    formErrorState: { isError: boolean }
    submit: () => void
}
interface IEmits {
    (e: 'error'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const formRef = ref<HTMLFormElement | null>(null);

const submit = () => {
    if (!formRef.value) return;

    const elements = formRef.value.elements;
    for (let i = 0; i < elements.length; i++) {
        elements[i]?.dispatchEvent(new FocusEvent('blur', { bubbles: true })); // триггерим Vue @blur
    }

    if (!props.formErrorState.isError) {
        props.submit()
    } else {
        nextTick().then(() => {
            const el = document.querySelector('[aria-invalid="true"]')
            if (el) {
                (el as HTMLElement).focus()

                // можно использовать, чтобы переключать табы на многостраничной форме.
                emit('error')
            }
        })
    }
}
</script>

<template>
    <form ref="formRef" @submit.prevent="submit">
        <slot></slot>
    </form>
</template>

<style scoped lang="scss"></style>