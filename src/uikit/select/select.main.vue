<script setup lang="ts">
import { type ISelectOption } from '../../types/ISelectOption';
import { UiIcon } from '../icon';
import { CheckMain } from '../check';
import { FieldMain } from '../field';
import Dropdown from './core/dropdown.vue';
import SelectWrapper from './core/selectWrapper.vue';
import { useSelect } from './composable/useSelect';

interface IProps {
    options: ISelectOption[]
    placeholder?: string
    defaultOption?: string
    isError?: boolean // для пометки внешних ошибок, например серверных.
    label?: string
    isTopPos?: boolean
    isMulti?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    isError: false,
    label: '',
    isTopPos: false
})

const modelValue = defineModel<ISelectOption[]>()

if (props.defaultOption) {
    modelValue.value = props.options.filter(item => item.value == props.defaultOption)
}

const isEqual = (val: string | number) => {
    return val === (modelValue.value ? modelValue.value[0]?.value : undefined)
}

const selectOption = (option: ISelectOption) => {
    if (!props.isMulti) {
        modelValue.value = [option]
        isOpen.value = false
        return
    }

    const exists = modelValue.value?.some(
        item => item.value === option.value
    )

    if (exists) {
        // remove
        modelValue.value = modelValue.value?.filter(
            item => item.value !== option.value
        )
    } else {
        // add
        modelValue.value = [
            ...(modelValue.value ?? []),
            option
        ]
    }
}

const comboboxRef = ref<HTMLElement | null>(null)

const { isOpen, listboxId, highlightedIndex, activeDescendant, handleKeydown, openDropdown, closeDropdown } = useSelect(props.options, isEqual, selectOption)

const toggleDropdown = () => {
    isOpen.value ? closeDropdown() : openDropdown()
}



const foundSelected = () => {
    return props.options.filter((opt) => modelValue.value?.find(item => item.value == opt.value))
}

const selectedLabel = computed(() => {
    const found: ISelectOption[] | undefined = foundSelected()
    return found?.map(item => item.label).join(', ') || ''
})

const selectedIcon = computed(() => {
    const found: ISelectOption[] | undefined = foundSelected()
    if (props.isMulti)
        return ''
    return found?.[0]?.iconName ?? ''
})

const isSelected = (option_val: string | number) => {
    return !!modelValue.value?.find(item => item.value == option_val)
}



const handleItemClick = (option: ISelectOption, index: number) => {
    highlightedIndex.value = index
    selectOption(option)
    setTimeout(() => comboboxRef.value?.focus(), 0)
}



</script>

<template>
    <FieldMain :label="label">
        <SelectWrapper v-model:isOpen="isOpen" class="select">
            <!--combobox -->
            <div ref="comboboxRef" role="combobox" tabindex="0" aria-haspopup="listbox" :aria-expanded="isOpen"
                :aria-controls="listboxId" :aria-activedescendant="activeDescendant" class="select__toggle" :class="[
                    { 'select__toggle_error': isError },
                    { 'select__toggle_open': isOpen }
                ]" @click="toggleDropdown" @keydown="handleKeydown">
                <div :class="{ 'select__label_placeholder': !selectedLabel }" class="select__label">
                    <UiIcon v-if="selectedIcon" :name="selectedIcon" />
                    {{ selectedLabel || placeholder }}
                </div>

                <div class="select__icon" :class="{ 'select__icon_open': isOpen }">
                    <UiIcon name="s-open" />
                </div>
            </div>

            <!-- dropdown -->
            <Dropdown :id="listboxId" v-model="highlightedIndex" :isOpen="isOpen" :options="options"
                :isSelected="isSelected" :isTopPos="isTopPos" :aria-multiselectable="isMulti ? 'true' : undefined"
                @itemClick="handleItemClick">

                <template #default="{ option }">
                    <CheckMain v-if="isMulti" :model-value="isSelected(option.value)" variant="three" tabindex="-1"
                        aria-hidden="true" />
                    <UiIcon v-if="option.iconName" :name="option.iconName" />
                </template>
            </Dropdown>
        </SelectWrapper>
    </FieldMain>
</template>

<style lang="scss" scoped>
.select {
    &__label {
        @include pos-center;
        height: 100%;
        gap: r(8);

        svg {
            width: r(20);
            height: r(20);
        }

        &_placeholder {
            color: $gray;
        }
    }

    &__icon {
        @include pos-center;
        transition: all 0.3s ease;

        &_open {
            transform: rotateZ(180deg);
        }
    }

    &__toggle {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: r(12);
        height: var(--height, r(48));
        width: 100%;
        border-radius: $brad;
        border: solid r(1) $field-border-color;
        padding: 0 r(24);


        &:focus-visible,
        &:active,
        &:hover,
        &_open {
            border: solid r(1) $red;
            outline: none;
        }
    }
}
</style>
