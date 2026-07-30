<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';

interface IProps {
    color: string
    tooltipSelector: string
}
interface IEmits {
    (e: 'openTooltip', selector: string): void
}
defineProps<IProps>()
const emit = defineEmits<IEmits>()
</script>

<template>
    <div class="service">
        <header class="service__header" :style="'background-color:' + color">
            <div>
                <slot name="header"></slot>
            </div>
            <button :id="tooltipSelector" @click="emit('openTooltip', '#' + tooltipSelector)"
                class="clickabled dot-btn">
                <UiIcon name="client-menu" />
            </button>
        </header>
        <main class="service__main">
            <slot></slot>
        </main>
    </div>
</template>

<style scoped lang="scss">
.service {
    border-radius: r(20);
    border: solid r(1) $l-gray;
    overflow: hidden;
    margin-bottom: r(24);


    &__header {
        border-bottom: solid r(1) $l-gray;
        padding: r(20) r(24);
        display: flex;
        gap: r(16);
        justify-content: space-between;
        align-items: center;
    }

    &__main {
        padding: r(24) r(20);
        background-color: white;
    }
}
</style>