<script setup lang="ts">
import type { ICheckViewProps } from "./types"
import { UiIcon } from "../../icon";

withDefaults(defineProps<ICheckViewProps>(), {
    disabled: false
})
</script>

<template>
    <div tabindex="0" :class="{ 'check__view_unact': !isCheck, 'check__view_dis': disabled }" class="check__view">
        <UiIcon name="check" v-if="isCheck" class="check__state" />
    </div>
</template>

<style lang="scss" scoped>
.check {
    $width: r(20);
    $height: r(20);

    &__view {
        width: $width;
        height: $height;
        border-radius: r(6);
        background-color: $red;
        border: solid r(1) $red;
        transition: all 0.3s ease;
        @include pos-center;

        &_unact {
            background-color: transparent;
            border: solid r(1) $m-gray;
        }

        &_dis {
            background-color: transparent;
            border: solid r(1) $gray;
            cursor: default;
        }

        &:focus {
            border: solid r(1) $red;
        }
    }

    &__state {
        color: white;
    }
}
</style>