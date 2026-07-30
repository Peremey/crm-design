<template>
    <div class="segment">
        <label v-for="item of data" class="segment__item" :class="{ 'segment__item_act': item.value == model }">
            <input :name="name" type="radio" v-model="model" :value="item.value" />
            <UiIcon v-if="item.iconName" :name="item.iconName" />
            <div v-if="item.label">{{ item.label }}</div>
        </label>
    </div>
</template>
<script setup lang="ts">
import { type ISelectOption } from "../../types/ISelectOption";
import { UiIcon } from "../icon";

interface IProps {
    name?: string
    data?: ISelectOption[]
}

const {
    data = [
        { label: '', value: 'calendar', iconName: 'f-calendar' },
        { label: '', value: 'list', iconName: 'f-list' }
    ],
    name = 'calendarToggle'
} = defineProps<IProps>()

const model = defineModel<string>()
</script>
<style lang="scss" scoped>
.segment {
    $width: r(104);
    $height: r(46);
    $state-w: $width / 2;
    $state-h: $height;

    width: $width;
    height: $height;
    border-radius: $brad;
    display: flex;
    overflow: hidden;
    border: solid r(1) $l-gray;

    &:has(input:focus) {
        border: solid r(1) $gray;
    }

    &__item {
        //transition: all 0.2s ease-in-out;
        width: $state-w;
        height: $state-h;
        background-color: white;
        color: $gray;
        cursor: pointer;
        @include pos-center;
        gap: r(8);

        svg {
            width: r(20);
            height: r(20);
        }

        input {
            opacity: 0;
            position: absolute;
            width: r(1);
            height: r(1);
        }

        &_act {
            background-color: $black;
            color: white;
            cursor: inherit;
        }

    }
}
</style>