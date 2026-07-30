<script setup lang="ts">
interface IProps {
    img: string
    name: string
    title: string
}
defineProps<IProps>()
</script>

<template>
    <div class="chat-title">
        <div class="chat-title__av">
            <img :src="img" alt="" />
            <div class="chat-title__status"></div>
        </div>
        <div class="chat-title__wrapper">
            <div class="chat-title__name">{{ name }}</div>
            <div class="chat-title__title">{{ title }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.chat-title {
    display: flex;
    align-items: center;
    gap: r(12);
    min-width: 0;

    &__av {
        border-radius: 50%;
        width: r(42);
        height: r(42);
        position: relative;
        flex: 0 0 auto;
    }

    &__status {
        position: absolute;
        width: r(10);
        height: r(10);
        background-color: $green;
        border-radius: 50%;
        right: 0;
        bottom: 0;
    }

    &__wrapper {
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: r(2);
        min-width: 0;
    }

    &__name {
        @include m-15;
    }

    &__title {
        @include n-14;
        color: $gray;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>