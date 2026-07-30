<script setup lang="ts">
import { UiIcon } from '../../icon';
import Toggle3 from './toggle3.vue';

import type { ICheckViewProps } from "./types"
defineProps<ICheckViewProps>()
</script>

<template>
    <Toggle3 :isCheck="!!isCheck">
        <template #act>
            <UiIcon name="sort-asc" />
            Сортировка
        </template>
        <template #unact>
            <div class="sort-icon">
                <UiIcon name="sort-asc" />
            </div>
            Сортировка
        </template>
    </Toggle3>
</template>

<style scoped lang="scss">
svg {
    width: r(20);
    height: r(20);
}

.sort-icon {
    transform: rotateX(180deg);
}
</style>