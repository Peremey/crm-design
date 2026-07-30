<script setup lang="ts">
import { UiIcon } from '../icon';

interface IProps {
    _id: string,
    isAccIcon: boolean,
    disabled?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    disabled: false
})
const activeComplexId = defineModel<string>()

const toggleSection = () => {
    if (props._id == activeComplexId.value) {
        activeComplexId.value = ''
    } else
        activeComplexId.value = props._id
}
</script>

<template>
    <div class="accordion">
        <button :disabled="disabled" @click="toggleSection" class="accordion__header" :class="[
            { 'accordion__header_opened': activeComplexId == _id },
            { 'accordion__header_small': !isAccIcon }
        ]">
            <slot></slot>

            <div v-if="isAccIcon" class="accordion__icon" :class="{ 'accordion__icon_opened': activeComplexId == _id }">
                <UiIcon name="s-open" />
            </div>
        </button>

        <Transition name="accordion">
            <div v-if="activeComplexId == _id" class="accordion__section">
                <slot name="body"></slot>
            </div>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
.accordion {
    &__header {
        width: 100%;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:hover {}

        &:disabled {
            cursor: inherit;
        }

        &_opened {}

        &_small {
            width: r(48);
        }
    }

    &__icon {
        transition: all 0.5s ease;
        color: $gray;
        margin-right: r(16);

        svg {
            width: r(24);
            height: r(24);
        }

        &_opened {
            transform: rotateZ(180deg);
        }
    }

    &__section {
        overflow: hidden;
    }
}
</style>