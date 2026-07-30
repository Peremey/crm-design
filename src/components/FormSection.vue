<script setup lang="ts">
interface IProps {
    label: string
}
defineProps<IProps>()
</script>

<template>
    <div class="section section__label">
        {{ label }}
    </div>
    <div class="section section__content">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.section {
    &__label {
        @include m-16;
        color: $black;
        min-width: 0;
    }

    &__content {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: r(24);
        --input-padding: 0;
    }
}
</style>