<script setup lang="ts">
interface IProps {
    title: string
    count: number
    maxCount: number
}
defineProps<IProps>()
</script>

<template>
    <div class="header">
        <div>
            <h4>{{ title }}</h4>
        </div>
        <div class="separator"></div>
        <div>{{ count }} / {{ maxCount }}</div>
    </div>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    gap: r(16);
    align-items: center;
}

.separator {
    width: r(1);
    height: r(36);
    background-color: $m-gray;
}
</style>