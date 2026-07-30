<script setup lang="ts">
import { ModalMain } from '../modal';
import { UiIcon } from '../icon';
interface IProps {
    message?: string
}
withDefaults(defineProps<IProps>(), {
    message: 'Какой-то текст'
})
const isOpen = defineModel<boolean>('isOpen')
const cancel = () => {
    isOpen.value = false
}
</script>

<template>
    <ModalMain v-model="isOpen">
        <template #header>
            <div class="b-modal b-modal__header">
                <div class="b-modal__title"></div>
                <button type="button" @click="isOpen = false" class="b-modal__close">
                    <UiIcon name="x" />
                </button>
            </div>
        </template>
        <div class="confirm">
            <div class="confirm__icon">
                <UiIcon name="delete" />
            </div>
            <div class="confirm__text">Удалить?</div>
            <div class="confirm__desc">{{ message }}</div>
        </div>

        <template #footer>
            <div class="b-modal b-modal__footer">
                <button type="button" @click="cancel" class="btn btn_white">
                    <UiIcon name="x" />
                    Отменить
                </button>
                <button class="btn btn_black">
                    <UiIcon name="delete" />
                    Удалить
                </button>
            </div>
        </template>
    </ModalMain>
</template>

<style scoped lang="scss">
.b-modal {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__close {
        color: $gray;
        padding: r(10);

        svg {
            width: r(20);
            height: r(20);
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        gap: r(16);
    }
}

.confirm {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: r(24);
    min-width: r(480);

    &__icon {
        width: r(72);
        height: r(72);
        border-radius: 50%;
        background-color: $l-red;
        @include pos-center;
        color: $red;

        svg {
            width: r(32);
            height: r(32);
        }
    }

    &__text {
        @include sb-20;
    }

    &__desc {
        @include n-16;
        color: $gray;
    }
}
</style>