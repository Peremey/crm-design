<script setup lang="ts">
import { UiIcon } from '~/uikit/icon';
interface IProps {
    label: string
}
defineProps<IProps>()

</script>

<template>
    <div class="logo">
        <div class="logo__label">{{ label }}</div>
        <div class="logo__wrapper">
            <slot>
                <div class="logo__img"></div>
            </slot>
            <div class="logo__controls">
                <button class="lnk">
                    <UiIcon name="plus" />
                    Загрузить изображение
                </button>
                <button class="lnk">
                    <UiIcon name="minus" />
                    Удалить
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.logo {
    margin-bottom: r(24);

    &__label {
        @include m-15;
        color: $gray;
        margin-bottom: r(4);
    }

    &__wrapper {
        display: flex;
        gap: r(12);
        align-items: center;
    }

    &__controls {
        display: flex;
        flex-direction: column;
        gap: r(16);
        align-items: flex-start;
    }

    &__img {
        width: r(84);
        height: r(84);
        background-color: $l-gray;
    }
}
</style>