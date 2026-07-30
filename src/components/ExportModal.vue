<script setup lang="ts">
import { useValidate } from '~/lib/validate';
import FormModal from './FormModal.vue';
import GroupFields from './GroupFields.vue';
import { CheckMain } from '~/uikit/check';

const { formErrorState } = useValidate();
const isOpen = defineModel<boolean>('isOpen')

const submit = () => {

}
</script>

<template>
    <FormModal v-model:isOpen="isOpen" title="Экспорт" :formErrorState="formErrorState" :submit="submit"
        variant="export" formID="form-export">

        <GroupFields _id="export" title="Поля" :isAccordion="false">
            <CheckMain variant="three" text="ФИО" />
            <CheckMain variant="three" text="E-mail" />
            <CheckMain variant="three" text="Авто" />
            <CheckMain variant="three" text="Телефон" />
            <CheckMain variant="three" text="Статус" />
        </GroupFields>
    </FormModal>
</template>

<style scoped lang="scss"></style>