<script setup lang="ts">
import { useValidate } from '~/lib/validate';
import { type ISelectOption } from '~/types/ISelectOption';
import { UiIcon } from '~/uikit/icon';
import { InputMain } from '~/uikit/input';
import { SelectMain } from '~/uikit/select';
import FormModal from '~/components/FormModal.vue';
import FormSection from '~/components/FormSection.vue';
import { numbersMask } from '~/lib/validate/masks/masks';

const isOpen = defineModel<boolean>('isOpen')
const { formErrorState, vMaxL } = useValidate();
const vTitle = vMaxL(120, true)
const vComment = vMaxL(1000)

const submit = () => {

}

const options = ref<ISelectOption[]>([{ label: 'На стрельбище', value: "На стрельбище", iconName: 'serv-1' }, { label: 'Обслуживание', value: "Обслуживание", iconName: 'serv-2' }, { label: 'Прочее', value: "Прочее", iconName: 'serv-3' }])

const options2 = ref<ISelectOption[]>([{ label: '1 час', value: "1" }, { label: '2 час', value: "2" }, { label: '3 час', value: "3" }])
</script>

<template>
    <FormModal v-model:isOpen="isOpen" title="Редактирование услуги" :formErrorState="formErrorState" :submit="submit">
        <FormSection label="Тип">
            <SelectMain :options="options" defaultOption="На стрельбище" class="field__select" />
        </FormSection>

        <FormSection label="Описание">
            <InputMain label="Название" :validate="vTitle" :required="true" />
            <InputMain label="Описание" :isTextarea="true" :validate="vComment" class="field__descr" />
        </FormSection>

        <FormSection label="Цена">
            <div class="field__row2">
                <InputMain label="От" :mask="numbersMask">
                    <template #iconRight>
                        <UiIcon name="rub" class="rub" />
                    </template>
                </InputMain>
                <InputMain label="До" :mask="numbersMask">
                    <template #iconRight>
                        <UiIcon name="rub" class="rub" />
                    </template>
                </InputMain>
            </div>
        </FormSection>

        <FormSection label="Длительность">
            <SelectMain :options="options2" defaultOption="1" :isTopPos="true" class="field__select" />
        </FormSection>
    </FormModal>
</template>

<style scoped lang="scss"></style>