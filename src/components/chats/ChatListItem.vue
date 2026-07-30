<script setup lang="ts">
import ChatItemTitle from './ChatItemTitle.vue';
interface IProps {
    item: number
}
defineProps<IProps>()

const activeItem = defineModel<number>()

const selectItem = (item: number) => {
    activeItem.value = item
}
</script>

<template>
    <div class="list-item" :key="'list-item' + item" @click="selectItem(item)"
        :class="{ 'list-item_act': item == activeItem }">
        <ChatItemTitle img="/img/tmp/person.png" name="Петр Петров"
            title="Как снимать и ставить винтовку на предохранитель" />
        <div class="list-item__counter badge">
            10
        </div>
    </div>
</template>

<style scoped lang="scss">
.list-item {
    padding: r(16) r(20);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: r(12);
    width: 100%;
    border-left: solid r(1) white;

    &_act {
        background-color: $l-red;
        border-left: solid r(1) $red;
    }

    &__counter {
        flex: 0 0 auto;
        width: fit-content;
    }
}
</style>