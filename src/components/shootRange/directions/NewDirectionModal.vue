<script setup lang="ts">
import { numbersMask } from '~/lib/validate/masks/masks';
import { useValidate } from '~/lib/validate';
import { type ISelectOption } from '~/types/ISelectOption';
import { CheckMain } from '~/uikit/check';
import { UiIcon } from '~/uikit/icon';
import { InputMain } from '~/uikit/input';
import { SelectMain } from '~/uikit/select';
import FormModal from '~/components/FormModal.vue';
import FormSection from '~/components/FormSection.vue';
import GroupRadioList from '~/components/GroupRadioList.vue';

const isOpen = defineModel<boolean>('isOpen')
const { formErrorState, vMaxL } = useValidate();

const vTitle = vMaxL(120, true)
const vComment = vMaxL(1000)

const submit = () => {

}

const options = ref<ISelectOption[]>([{ label: '1 час', value: "1" }, { label: '2 час', value: "2" }, { label: '3 час', value: "3" }])
const special = ref('Карабин')
const specialData = ref<ISelectOption[]>([{ label: 'Карабин', value: "Карабин" }, { label: 'Пистолет', value: "Пистолет" }, { label: 'Пистолет, карабин', value: "Пистолет,Карабин" }])

const filterData = ref({ available: [false, false] })
</script>

<template>
    <FormModal v-model:isOpen="isOpen" title="Новое направление" :formErrorState="formErrorState" :submit="submit">
        <FormSection label="Описание">
            <InputMain label="Название" :validate="vTitle" :required="true" />
            <InputMain label="Описание" :isTextarea="true" :validate="vComment" class="field__descr" />
        </FormSection>

        <FormSection label="Интервалы">
            <SelectMain :options="options" defaultOption="1" class="field__select" />
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

        <FormSection label="Параметры">
            <GroupRadioList _id="special" title="Специализация" name="special" v-model:selected="special"
                :data="specialData" />

            <InputMain label="Количество мест" :mask="numbersMask" />
            <InputMain label="Ширина" :mask="numbersMask" />

            <div class="field__row2">
                <InputMain label="Дистанция от" :mask="numbersMask" />
                <InputMain label="до" :mask="numbersMask" />
            </div>

            <CheckMain variant="three" text="Доступно" v-model="filterData.available[0]" />
            <CheckMain variant="three" text="Только с инструктором" v-model="filterData.available[1]" />
        </FormSection>
    </FormModal>
</template>

<style scoped lang="scss"></style>