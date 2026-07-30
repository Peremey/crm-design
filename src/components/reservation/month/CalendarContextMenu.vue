<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
interface IEmits {
    (e: 'close'): void
    (e: 'add'): void
}
const emit = defineEmits<IEmits>()

</script>

<template>
    <div class="context-menu">
        <button @click="emit('close')" class="context-menu__close">
            <UiIcon name="close-fill" />
        </button>
        <button @click="emit('add')" class="context-menu__item">
            <UiIcon name="add" />
            <div>Добавить запись</div>
        </button>
        <button class="context-menu__item">
            <UiIcon name="close" />
            <div>Санитарный день</div>
        </button>
    </div>
</template>

<style scoped lang="scss">
.context-menu {
    position: relative;

    &__item {
        padding: r(12) r(16);
        display: flex;
        align-items: center;
        gap: r(8);
        @include sb-15;
        color: $black;

        svg {
            width: r(24);
            height: r(24);
        }
    }

    &__close {
        position: absolute;
        top: 0;
        right: 0;
        width: fit-content;

        svg {
            width: r(20);
            height: r(20);
        }
    }
}
</style>