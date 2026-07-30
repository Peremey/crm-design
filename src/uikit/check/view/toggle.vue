<template>
    <div :class="{ 'check__view_unact': !isCheck }" class="check__view">
        <div :class="{ 'check__state_act': isCheck }" class="check__state"></div>
    </div>
</template>
<script setup lang="ts">
import type { ICheckViewProps } from "./types"
defineProps<ICheckViewProps>()
</script>
<style lang="scss" scoped>
.check {
    $width: r(53);
    $height: r(32);
    $size: r(28);
    $padding: $height / 2 - $size / 2;

    &__view {
        width: $width;
        height: $height;
        border-radius: r(16);
        background-color: $red;
        transition: all 0.2s ease-in-out;

        &_unact {
            background-color: $m-gray;
        }
    }

    &__state {

        width: $size;
        height: $size;
        border-radius: 50%;
        background-color: white;
        margin: $padding;
        transition: all 0.2s ease-in-out;
        transform: translateX(0);

        &_act {
            transform: translateX(calc(#{$width} - #{$size} - 2 * #{$padding}));
        }
    }
}
</style>