<script setup lang="ts">
import { type ISelectOption } from '../../types/ISelectOption';
import { InputMain } from '../input';
import { type IError } from '../../types/err';
import { FieldMain } from '../field';
import Dropdown from './core/dropdown.vue';
import SelectWrapper from './core/selectWrapper.vue';
import { useSelect } from './composable/useSelect';


interface IProps {
    options: ISelectOption[]
    placeholder?: string
    outerError?: string
    label?: string
    isTopPos?: boolean
    emptyImg?: string
    validate?: (value: string, fieldId: string) => IError
}
interface IEmits {
    (e: 'search'): void
}

const props = withDefaults(defineProps<IProps>(), {
    outerError: '',
    label: '',
    isTopPos: false
})
const emit = defineEmits<IEmits>()

const modelValue = defineModel<string>()

const isEqual = (val: string | number) => {
    return val === modelValue.value
}
const selectOption = (option: { label: string; value: any }) => {
    modelValue.value = option.value
    isOpen.value = false
    setTimeout(() => inputRef.value!.blur(), 0)
}

const { isOpen, listboxId, highlightedIndex, activeDescendant, handleKeydown } = useSelect(props.options, isEqual, selectOption)

const keydownProcess = (e: KeyboardEvent) => {
    handleKeydown(e)
    setTimeout(() => inputRef.value!.blur(), 0)
}

const selectedImg = computed(() => {
    const found = props.options?.find((opt) => opt.value === modelValue.value)
    return found?.img || ''
})

const isSelected = (option_val: string | number) => {
    return option_val === modelValue.value
}


const dataList = ref<Array<any>>([])

const search = () => {
    emit('search')
    /*return runner.run(props.service, temporaryDataList, { search: text.value })
        .then(() => {
            if (temporaryDataList.value.length > 0) {
                dataList.value = props.getData(temporaryDataList.value)
            }
        })*/
}

const inputRef = ref<any>(null)

const openList = () => {
    if (dataList.value.length == 0) {
        search()
    }
}

const toggleList = () => {
    openList()
    isOpen.value = !isOpen.value
}

const focus = () => {
    openList()
    isOpen.value = true
}

const changeText = (event: Event) => {
    const inputText = (event.target as HTMLInputElement).value;
    if ((inputText.length > 3 || inputText.length == 0)) {
        isOpen.value = true
        search()
    }
}
</script>

<template>
    <FieldMain :label="label">
        <SelectWrapper v-model:isOpen="isOpen" role="combobox" :aria-expanded="isOpen" :aria-controls="listboxId"
            :aria-activedescendant="activeDescendant" class="select">

            <InputMain ref="inputRef" v-model="modelValue" :validate="validate" :isFocused="false" width="100%"
                iconNameRight="selectOpen" :placeholder="placeholder" :outerError="outerError" @click="toggleList"
                @keydown.stop="keydownProcess" @focus="focus" @changeText="changeText">
                <template v-if="emptyImg" #iconLeft>
                    <img :src="selectedImg ? selectedImg : emptyImg" alt="" class="select__img" />
                </template>
            </InputMain>

            <!-- dropdown -->
            <Dropdown :id="listboxId" v-model="highlightedIndex" :isOpen="isOpen" :options="options"
                :isSelected="isSelected" :isTopPos="isTopPos" @itemClick="selectOption">

                <template #default="{ option }">
                    <img v-if="emptyImg" :src="option.img ? option.img : emptyImg" alt="" class="select__img" />
                </template>
            </Dropdown>
        </SelectWrapper>
    </FieldMain>
</template>

<style lang="scss" scoped>
.field {
    padding-bottom: var(--input-padding, r(28));

    &__label {
        color: $gray;
        margin-bottom: r(8);
        @include m-15;
    }
}

.select {
    position: relative;

    &__img {
        width: r(20);
        height: r(20);
    }
}
</style>
