<script setup lang="ts">
import { FormMain } from '~/uikit/form';
import { ModalMain } from '~/uikit/modal';
import { UiIcon } from '~/uikit/icon';

interface IProps {
    title?: string
    formID?: string
    formErrorState: { isError: boolean }
    submit: () => void
    variant?: string
    submitBtnTitle?: string
}
interface IEmits {
    (e: 'error'): void
}

withDefaults(defineProps<IProps>(), {
    formID: 'form-submit',
    submitBtnTitle: 'Сохранить'
})
const emit = defineEmits<IEmits>()

const isOpen = defineModel<boolean>('isOpen')
const cancel = () => {
    isOpen.value = false
}
</script>

<template>
    <ModalMain v-model="isOpen">
        <template #header>
            <div class="b-modal b-modal__header">
                <div class="b-modal__title">{{ title }}</div>
                <button type="button" @click="isOpen = false" class="b-modal__close">
                    <UiIcon name="x" />
                </button>
            </div>
            <slot name="header"></slot>
        </template>

        <FormMain :id="formID" :submit="submit" :formErrorState="formErrorState" @error="emit('error')"
            class="b-modal b-modal__main" :class="{
                'b-modal__main_files': variant == 'export' || variant == 'import',
                'b-modal__main_short': variant == 'short'
            }">
            <slot></slot>
        </FormMain>

        <template #footer>
            <div class="b-modal b-modal__footer"
                :class="{ 'b-modal__footer_files': variant == 'export' || variant == 'import' }">

                <slot name="footer"></slot>
                <button type="button" @click="cancel" class="btn btn_white">
                    <UiIcon v-if="variant != 'short'" name="x" />
                    Отменить
                </button>
                <button :form="formID" class="btn btn_black b-modal__btn">
                    <UiIcon v-if="variant != 'short'" name="check" />
                    {{ submitBtnTitle }}
                </button>
            </div>
        </template>
    </ModalMain>
</template>

<style scoped lang="scss">
.b-modal {
    position: relative;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__title {
        @include sb-16;
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
        justify-content: flex-end;
        gap: r(16);

        &_files {
            justify-content: space-between;
        }
    }

    &__main {
        display: grid;
        grid-template-columns: r(172) 1fr;
        column-gap: r(24);
        row-gap: r(24);
        width: r(800);

        &_files {
            width: r(560);
            display: block;
        }

        &_short {
            width: r(400);
            display: block;
        }
    }

    &__btn {
        width: r(210);
    }
}
</style>