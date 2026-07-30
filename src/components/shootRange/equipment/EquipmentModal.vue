<script setup lang="ts">
import { numbersMask } from '~/lib/validate/masks/masks';
import { useValidate } from '~/lib/validate';
import { type ISelectOption } from '~/types/ISelectOption';
import { CheckMain } from '~/uikit/check';
import { InputMain } from '~/uikit/input';
import { SelectMain } from '~/uikit/select';
import FormModal from '~/components/FormModal.vue';
import FormSection from '~/components/FormSection.vue';

const isOpen = defineModel<boolean>('isOpen')
const { formErrorState, vMaxL } = useValidate();
const vComment = vMaxL(1000)

const submit = () => {

}

const options = ref<ISelectOption[]>([{ label: 'Мишень', value: "Мишень" }, { label: 'Аренда', value: "Аренда" }, { label: 'Прочее', value: "Прочее" }])

const options2 = ref<ISelectOption[]>([{ label: 'Сталь', value: "Сталь" }, { label: 'Дерево', value: "Дерево" }, { label: 'Бумага', value: "Бумага" }])

const isArenda = ref(false)
</script>

<template>
    <FormModal v-model:isOpen="isOpen" title="Новое оборудование" :formErrorState="formErrorState" :submit="submit">
        <FormSection label="Описание">
            <SelectMain label="Тип" :options="options" defaultOption="Мишень" class="field__select_full" />
            <InputMain label="Размер (мм)" :mask="numbersMask" />
            <SelectMain label="Материал" :options="options2" defaultOption="Сталь" class="field__select_full" />
            <InputMain label="Кол-во шт" :mask="numbersMask" />
            <InputMain label="Описание" :isTextarea="true" :validate="vComment" class="field__descr" />
            <CheckMain variant="three" text="Арендное" v-model="isArenda" />
        </FormSection>
    </FormModal>
</template>

<style scoped lang="scss"></style>