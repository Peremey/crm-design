<script setup lang="ts">
import { useValidate } from '~/lib/validate';
import FormModal from '../FormModal.vue';
import { InputMain } from '~/uikit/input';
import { UiIcon } from '~/uikit/icon';
import { CheckMain } from '~/uikit/check';
import { phoneMask } from '~/lib/validate/masks/masks';

const isOpen = defineModel<boolean>('isOpen')
const { formErrorState, vName, vPhone, vEmail } = useValidate();

const submit = () => {

}
</script>

<template>
    <FormModal v-model:isOpen="isOpen" title="Регистрация" :formErrorState="formErrorState" :submit="submit"
        submitBtnTitle="Зарегистрироваться" variant="short">

        <InputMain label="Фамилия" :validate="vName" :required="true" />
        <InputMain label="Имя" :validate="vName" :required="true" />
        <InputMain label="Отчество" :validate="vName" :required="true" />
        <InputMain label="Телефон" :validate="vPhone" :mask="phoneMask" :required="true">
            <template #iconLeft>
                <UiIcon name="phone" />
            </template>
        </InputMain>
        <InputMain label="Email" :validate="vEmail">
            <template #iconLeft>
                <UiIcon name="t-letter" />
            </template>
        </InputMain>
        <CheckMain variant="three" text="Согласие на обработку персональных данных" />
    </FormModal>
</template>

<style scoped lang="scss"></style>