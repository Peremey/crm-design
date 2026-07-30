<script setup lang="ts">
import { type IError } from '../../types/err';
import { FieldMain } from '../field';
import { useId } from 'vue';
import { type IMask } from '../../types/mask';

interface IProps {
    label?: string
    type?: "text" | "password" | "date" | "time" | "number",
    validate?: (value: string, fieldId: string) => IError
    isFocused?: boolean
    required?: boolean
    mask?: IMask
    isTextarea?: boolean,
    outerError?: string
    class?: string
}

interface IEmits {
    (e: 'focus'): void,
    (e: 'blur'): void,
    (e: 'error', err: IError): void,
    (e: 'click'): void,
    (e: 'changeText', event: Event): void
    (e: 'submit'): void
}

const props = withDefaults(defineProps<IProps>(), {
    type: "text",
    validate: () => { return { message: '', isError: false } },
    isFocused: true,
    isTextarea: false,
    outerError: '',
    class: ''
});
const emit = defineEmits<IEmits>()

defineOptions({
    inheritAttrs: false
})

const validateID = useId()

const modelValue = defineModel<string | number | null>();
const isActive = ref(false)
const [validateModel] = defineModel<IError>('validateModel')

const validator = computed(() =>
    validateModel.value ?? { message: '', isError: false }
)
const typeState = ref(props.type == "number" ? "text" : props.type)

const focus = () => {
    if (!validator.value.isError) {
        if (props.isFocused)
            isActive.value = true
    }
    emit('focus')
}

const blur = () => {
    const validateRes = props.validate ?
        props.validate(modelValue.value?.toString() || "", validateID) :
        { message: '', isError: false }
    validateModel.value = validateRes

    isActive.value = false
    emit('blur')

    if (validateRes.isError) {
        emit('error', validateRes)
    }
}

defineExpose({
    blur
});

const changeText = (e: Event) => {
    emit('changeText', e)
    onInput(e)
}
const internalValue = ref('')

watch(
    () => modelValue.value,
    (val) => {
        const raw = val ?? ''
        internalValue.value = props.mask ? props.mask.mask(raw.toString()) : raw.toString()
    },
    { immediate: true }
)

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const inputValue = target.value
    const cleaned = props.mask?.unmask ? props.mask.unmask(inputValue) : inputValue
    modelValue.value = cleaned
    internalValue.value = props.mask ? props.mask.mask(cleaned) : cleaned
}

const hasError = computed(() =>
    validator.value.isError || !!props.outerError
)
</script>

<template>
    <FieldMain :label="label" :required="required" :class="class">
        <label class="input-main" :class="{
            'input-main_active': isActive,
            'input-main_error': hasError,
            'input-main_textarea': isTextarea
        }">

            <div class="input-main__icon input-main__icon_left">
                <slot name="iconLeft"></slot>
            </div>

            <input v-if="!isTextarea" v-bind="$attrs" v-model="internalValue" :type="typeState"
                :inputmode="type == 'number' ? 'numeric' : 'text'" @focus="focus" @blur="blur" @input="changeText"
                :aria-invalid="hasError ? 'true' : undefined" :aria-describedby="hasError ? validateID : undefined" />

            <textarea v-else v-bind="$attrs" v-model="internalValue" :type="typeState" @focus="focus" @blur="blur"
                @input="changeText" :aria-invalid="hasError ? 'true' : undefined"
                :aria-describedby="hasError ? validateID : undefined" />

            <div class="input-main__icon input-main__icon_right">
                <slot name="iconRight"></slot>
            </div>

            <div :id="validateID" v-if="hasError" class="input-main__message">
                <div>{{ outerError ? outerError : validator.message }}</div>
            </div>
        </label>
    </FieldMain>
</template>

<style scoped lang="scss">
.input-main {
    @include n-14;

    height: var(--height, r(48));
    border-radius: var(--border-radius, $brad);
    background-color: white;
    border: solid r(1) $field-border-color;

    &_textarea {
        padding: r(12);
        border-radius: r(20)
    }

    position: relative;
    $pv: r(16);
    padding-left: $pv;
    padding-right: $pv;

    ::placeholder {
        color: $gray;
    }

    display: flex;

    input,
    textarea {
        flex: 0 1 auto;
        min-width: 0;
        width: 100%;
        @include m-15;
        overflow-wrap: break-word;
        word-break: break-word;
    }

    &:has(input:focus-visible),
    &:has(textarea:focus-visible) {
        border: solid r(1) $red;
    }

    textarea {
        height: 100%;
        resize: none !important;
        white-space: pre-wrap;
    }

    &_error {
        border: solid r(1) $red;
        color: $red;
        background-color: $l-red;
    }

    &__message {
        color: $red;
        display: flex;
        gap: r(8);
        position: absolute;
        bottom: r(-20);
        @include n-14;
    }

    &:has(input:disabled),
    &:has(textarea:disabled) {
        pointer-events: none;
        color: $l-gray;

        input,
        textarea {
            cursor: not-allowed;
        }
    }

    &__icon {
        @include pos-center;

        &_left {
            padding-right: r(8);
        }

        :deep(svg) {
            width: r(20);
            height: r(20);
            color: $gray;
        }
    }
}
</style>