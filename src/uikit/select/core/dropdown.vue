<script setup lang="ts">
import { type ISelectOption } from '../../../types/ISelectOption';
import { UiIcon } from '../../icon';

interface IProps {
    isOpen: boolean
    id: string
    isTopPos: boolean
    options: ISelectOption[]
    isSelected: (option_val: string | number) => boolean
}
defineProps<IProps>()

interface IEmits {
    (e: 'itemClick', option: ISelectOption, index: number): void
}
const emit = defineEmits<IEmits>()

const highlightedIndex = defineModel<number>()
</script>

<template>
    <ul v-if="isOpen" :id="id" role="listbox" class="select__dropdown" :class="{ 'select__dropdown_top': isTopPos }">

        <li v-for="(option, index) in options" :key="option.value" :id="`${id}-option-${index}`" role="option"
            :aria-selected="isSelected(option.value)" class="item" :class="{
                'item_selected': isSelected(option.value),
                'item_active': index === highlightedIndex
            }" @click="emit('itemClick', option, index)" @mouseenter="highlightedIndex = index">

            <div class="item__label">
                <slot :option="option" />
                {{ option.label }}
            </div>

            <UiIcon v-if="isSelected(option.value)" name="check" />
        </li>
    </ul>
</template>

<style scoped lang="scss">
.select {
    &__dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        z-index: 10;
        max-height: var(--cselect-maxh, r(200));
        overflow-y: auto;
        border-radius: r(8);
        border-top: r(1) solid transparent;
        border-radius: r(20);
        border: solid r(1) $field-border-color;
        margin-top: r(4);

        &_top {
            top: 0;
            transform: translateY(calc(-100% - r(4)));
            margin-top: 0;
        }
    }
}

.item {
    display: flex;
    padding: 0 r(24);
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    min-height: r(42);
    @include m-15;

    &:hover,
    &_active {
        @include sb-15;
        background-color: $l-red;
    }

    &_selected {
        color: $red;
    }

    &__label {
        display: flex;
        align-items: center;
        gap: r(8);
        pointer-events: none;
    }

    svg {
        width: r(20);
        height: r(20);
    }
}
</style>