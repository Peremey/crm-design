<script setup lang="ts">
interface IProps {
    label?: string
    required?: boolean
}
const { required = false } = defineProps<IProps>()
</script>

<template>
    <div class="field">
        <div v-if="label" class="field__label">
            {{ label }} <span v-if="required" class="field__label_req">*</span>
        </div>

        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.field {
    padding-bottom: var(--input-padding, r(28));

    &__label {
        color: $gray;
        margin-bottom: r(8);
        @include m-15;

        &_req {
            color: $red;
        }
    }
}
</style>