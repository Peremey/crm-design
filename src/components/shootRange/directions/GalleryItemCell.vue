<script setup lang="ts">
interface IProps {
    label: string
}
defineProps<IProps>()
</script>

<template>
    <div class="cell">
        <div class="cell__label">{{ label }}</div>
        <div class="cell__content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cell {
    padding: r(8) r(16);

    &__label {
        @include m-12;
        color: $gray;
        margin-bottom: r(4);
    }

    &__content {
        color: $black;
        @include m-15;
    }
}
</style>