<script setup lang="ts">
import Chat from '~/components/chats/Chat.vue';
import ChatItemTitle from '~/components/chats/ChatItemTitle.vue';
import ChatList from '~/components/chats/ChatList.vue';
import FilterSearch from '~/components/filters/FilterSearch.vue';

</script>

<template>
    <section name="chats" class="chats cont">
        <h1>Обращения</h1>
        <div class="chats__board">
            <div class="chats__list">
                <div class="chats__header">
                    <FilterSearch class="novalidate" />
                </div>
                <ChatList />
            </div>
            <div class="chats__chat">
                <div class="chats__header chats__header_wide">
                    <ChatItemTitle img="/img/tmp/person.png" name="Петр Петров"
                        title="Как снимать и ставить винтовку на предохранитель" />
                </div>
                <Chat />
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.chats {
    &__board {
        border-radius: r(20);
        border: solid r(1) $l-gray;
        overflow: hidden;
        display: flex;
        height: calc(100dvh - r(170) - r(24));
    }

    &__list {
        border-right: solid r(1) $l-gray;
        width: r(320);
        background-color: white;
    }

    &__chat {
        flex: 1 1 auto;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    &__header {
        height: r(80);
        border-bottom: solid r(1) $l-gray;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: r(18) r(20);
        flex: 0 0 auto;

        &_wide {
            justify-content: space-between;
        }
    }
}
</style>
