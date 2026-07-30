<script setup lang="ts">
import { type IconName } from '../../types/icon-names';
import { UiIcon } from '../icon';

interface IProps {
    count: number
    icon: IconName
    isActive?: boolean
}
defineProps<IProps>()
</script>

<template>
    <button class="notify clickabled" :class="{ 'clickabled_act': isActive }">
        <UiIcon :name="icon" />
        <div v-if="count" class="badge">{{ count }}</div>
    </button>
</template>

<style lang="scss" scoped>
.notify {
    width: r(48);
    height: r(48);
    border: solid r(1) $l-gray;
    border-radius: 50%;
    position: relative;
    @include pos-center;

    svg {
        width: r(24);
        height: r(24);
    }
}

.badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(10%);
}
</style>