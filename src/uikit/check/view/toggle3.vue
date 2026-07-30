<template>
    <div class="check__view">
        <div class="check__wrapper">
            <div :class="{ 'check__state_act': isCheck }" class="check__state">
                <slot name="act">
                    <UiIcon name="f-calendar" />
                    Месяц
                </slot>
            </div>
            <div :class="{ 'check__state_act': !isCheck }" class="check__state">
                <slot name="unact">
                    <UiIcon name="f-calendar" />
                    Неделя
                </slot>
            </div>
        </div>
        <UiIcon name="s-open" />
    </div>
</template>
<script setup lang="ts">
import { UiIcon } from "../../icon";
import type { ICheckViewProps } from "./types"
defineProps<ICheckViewProps>()
</script>
<style lang="scss" scoped>
.check {
    $width: r(195);
    $height: r(46);

    &__view {
        width: $width;
        height: $height;
        border-radius: $brad;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        border: solid r(1) $l-gray;
        gap: r(8);
        color: $gray;
        padding: 0 r(16);

        &:has(+ input:focus) {
            border: solid r(1) $gray;
        }

        svg {
            width: r(20);
            height: r(20);
        }

    }

    &__wrapper {
        @include pos-center;
        gap: r(8);
    }

    &__state {
        transition: all 0.2s ease-in-out;
        background-color: white;
        color: $black;
        @include pos-center;
        @include m-15;
        display: none;


        &_act {
            display: flex;
            gap: r(8);
        }

        svg {
            width: r(20);
            height: r(20);
        }
    }
}
</style>