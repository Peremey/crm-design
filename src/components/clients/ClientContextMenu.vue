<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';

interface IEmits {
    (e: 'history'): void
    (e: 'wearon'): void
    (e: 'delete'): void
}
const emit = defineEmits<IEmits>()
</script>

<template>
    <div class="context-menu">
        <button @click="emit('history')" class="context-menu__btn">
            <UiIcon name="history" />
            <div>История посещений</div>
        </button>
        <button @click="emit('wearon')" class="context-menu__btn">
            <UiIcon name="wearon" />
            <div>Оружие</div>
        </button>
        <button class="context-menu__btn">
            <UiIcon name="edit" />
            <div>Изменения</div>
        </button>
        <button class="context-menu__btn">
            <UiIcon name="t-chat" />
            <div>Чат</div>
        </button>
        <button class="context-menu__btn">
            <UiIcon name="t-letter" />
            <div>Письмо</div>
        </button>
        <button class="context-menu__btn">
            <UiIcon name="t-phone-call" />
            <div>Звонок</div>
        </button>
        <button @click="emit('delete')" class="context-menu__btn  context-menu__btn_red">
            <UiIcon name="delete" />
            <div>Удалить</div>
        </button>
    </div>
</template>

<style scoped lang="scss">
.context-menu {
    width: r(240);
    height: r(376);
    padding: r(8);
}
</style>