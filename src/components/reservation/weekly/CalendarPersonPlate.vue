<script setup lang="ts">
interface IProps {
    avatar: string
    name: string
    isMulti: boolean
    colorIndex: number

}
defineProps<IProps>()
const colors = ['#FEC74F', '#069CFF', '#6DBA00', '#FE353D']
</script>

<template>
    <button class="person" :style="'--person-plate-color: ' + (colors[colorIndex] ? colors[colorIndex] : '#FEC74F') +
        ';--person-plate-w: ' + (isMulti ? 'fit-content;' : '100%;')">
        <img :src="avatar" alt="" class="person__avatar" />
        <div v-if="!isMulti" class="person__name">{{ name }}</div>
    </button>
</template>

<style scoped lang="scss">
.person {
    display: flex;
    gap: r(8);
    border-radius: r(8);
    padding: r(6);
    background-color: color-mix(in srgb,
            var(--person-plate-color) 60%,
            white 40%);
    width: var(--person-plate-w, 100%);
    overflow: hidden;
    flex: 0 0 auto;

    &:not(:disabled):hover {
        background-color: var(--person-plate-color);
    }

    &:active {
        background-color: var(--person-plate-color);
    }

    &:disabled {
        background-color: $l-gray;
        cursor: inherit;
        opacity: 0.5;
    }

    &__avatar {
        width: r(20);
        height: r(20);
    }
}
</style>