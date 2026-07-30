<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
interface IEmits {
    (e: 'edit'): void
}
const emit = defineEmits<IEmits>()

const edit = () => {
    emit('edit')
}
</script>

<template>
    <div class="context-menu">
        <button @click="edit" class="context-menu__btn">
            <UiIcon name="edit" />
            <div>Редактировать</div>
        </button>
        <button class="context-menu__btn context-menu__btn_red">
            <UiIcon name="delete" />
            <div>Удалить</div>
        </button>
    </div>
</template>

<style scoped lang="scss">
.context-menu {
    width: r(240);
    height: fit-content;
    padding: r(8);
}
</style>