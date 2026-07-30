<script setup lang="ts">
import { useValidate } from '~/lib/validate';
import FormModal from './FormModal.vue';
import { CheckMain } from '~/uikit/check';
import { UiIcon } from '~/uikit/icon';

const { formErrorState } = useValidate();
const isOpen = defineModel<boolean>('isOpen')

const submit = () => {

}
</script>

<template>
    <FormModal v-model:isOpen="isOpen" title="Импорт" :formErrorState="formErrorState" :submit="submit" variant="import"
        formID="form-import">
        <div class="upload-view">
            <div class="upload-view__icon">
                <UiIcon name="file" />
            </div>
            <div class="upload-view__text">Допустимый формат файлов pdf, jpg, jpeg, heic, png</div>
            <button class="btn btn_black">
                <UiIcon name="plus" />
                Добавить файл
            </button>
        </div>

        <CheckMain variant="three" text="Заменять совпадающие записи" />
    </FormModal>
</template>

<style scoped lang="scss">
.upload-view {
    border-radius: r(20);
    border: solid r(1) $l-gray;
    height: r(194);
    @include pos-center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: r(18);
    margin-bottom: r(24);

    &__icon {
        width: r(48);
        height: r(48);
        background-color: $l-red;
        border-radius: 50%;
        @include pos-center;

        svg {
            width: r(20);
            height: r(20);
        }
    }

    &__text {
        @include m-15;
        color: $gray;
    }
}
</style>