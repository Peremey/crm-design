<template>
    <label class="check">
        <component :is="view" :isCheck="!!isCheck" :disabled="disabled" />

        <input type="checkbox" v-bind="$attrs" v-model="isCheck"
            :disabled="disabled"><!--  @change="checkChange($event)" -->

        <div v-if="text.length" class="check__label"
            :class="[{ 'check__label_dis': disabled }, { 'check__label_act': isCheck }]">{{ text }}
        </div>
    </label>
</template>

<script setup lang="ts">

interface IProps {
    text?: string,
    variant?: 'toggle' | 'three' | 'toggle3' | 'sort',
    disabled?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
    variant: 'toggle',
    disabled: false,
    text: ''
})

defineOptions({
    inheritAttrs: false,
})
const isCheck = defineModel<boolean>()
/*
const checkChange = (e: Event) => {
    if (!props.disabled)
        isCheck.value = (e.target as HTMLInputElement).checked
}*/

const view = computed(() => {
    const variant = props.variant
    return defineAsyncComponent(() => import(`./view/${variant}.vue`))
})
</script>

<style lang="scss" scoped>
.check {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: $gray;
    height: fit-content;
    flex: 0 0 auto;
    gap: r(8);


    input {
        opacity: 0;
        width: 1px;
        height: 1px;
        position: absolute;
    }

    &__label {
        @include m-15;

        &_dis {
            color: $gray;
        }

        &_act {
            color: $red;
            @include m-15;
        }
    }
}
</style>