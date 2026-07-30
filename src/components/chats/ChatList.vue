<script setup lang="ts">
import ChatListItem from './ChatListItem.vue';

const activeItem = defineModel<number>()
</script>

<template>
    <div class="chats-list">
        <ChatListItem v-for="i of 20" :item="i" v-model="activeItem" />
    </div>
</template>

<style scoped lang="scss">
.chats-list {
    height: 100%;
    overflow-y: auto;
}
</style>