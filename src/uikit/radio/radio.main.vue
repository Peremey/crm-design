<script setup lang="ts">
interface IProps {
    name: string,
    optionValue: string
    optionLabel?: string
}
const props = defineProps<IProps>()

const value = defineModel<string>()
const isChecked = computed(() => value.value === props.optionValue)
</script>

<template>
    <label class="radio" :class="{ radio_active: isChecked }">
        <input :name="name" type="radio" v-model="value" :value="optionValue" />

        <div class="radio__view">
            <div v-if="isChecked"></div>
        </div>

        {{ optionLabel ? optionLabel : optionValue }}
    </label>
</template>

<style scoped lang="scss">
.radio {
    color: $gray;
    @include m-15;
    display: flex;
    align-items: center;
    gap: r(8);
    cursor: pointer;

    input {
        opacity: 0;
        pointer-events: none;
        position: absolute;

        &:focus-visible+.radio__view {
            border: 1px solid $red;
        }
    }

    &_active {
        color: $red;
    }

    &__view {
        width: r(20);
        height: r(20);
        border-radius: 50%;
        border: solid r(1) $gray;
        @include pos-center;

        &>div {
            width: r(12);
            height: r(12);
            background-color: $red;
            border-radius: 50%;
        }
    }
}
</style>