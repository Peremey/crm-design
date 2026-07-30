<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';

interface IProps {
    title: string
}
defineProps<IProps>()
</script>

<template>
    <div class="plate">
        <UiIcon name="close-fill" />
        <div>{{ title }}</div>
    </div>
</template>

<style scoped lang="scss">
.plate {
    height: var(--height-blocked-plate, r(44));
    background-color: white;
    border-radius: r(8);
    @include pos-center;
    gap: r(8);
    @include n-10;

    svg {
        width: r(20);
        height: r(20);
    }
}
</style>