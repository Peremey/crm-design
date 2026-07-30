<script setup lang="ts">
import { useValidate } from '~/lib/validate';
import { type ISelectOption } from '~/types/ISelectOption';
import { InputMain } from '~/uikit/input';
import { SelectMain } from '~/uikit/select';
import FormModal from '~/components/FormModal.vue';
import FormSection from '~/components/FormSection.vue';
import { UiIcon } from '~/uikit/icon';
import LogoUpload from '../shootRange/parameters/LogoUpload.vue';
import GroupCheckList from '../GroupCheckList.vue';
import GroupRadioList from '../GroupRadioList.vue';
import { numbersMask, phoneMask } from '~/lib/validate/masks/masks.ts';

const isOpen = defineModel<boolean>('isOpen')

const { formErrorState, vMaxL, vName, vPhone, vEmail } = useValidate();
const vComment = vMaxL(1000)

const submit = () => {

}
const special = ref('Карабин')
const specialData = ref<ISelectOption[]>([{ label: 'Карабин', value: "Карабин" }, { label: 'Пистолет', value: "Пистолет" }, { label: 'Пистолет, карабин', value: "Пистолет,Карабин" }])
const options = ref<ISelectOption[]>([{ label: 'Работает', value: "Работает" }, { label: 'Не работает', value: "Не работает" }])

const filterData = ref({
    services: [
        { value: 'Пристрелка 1 ед. оружия', selected: false },
        { value: 'Чистка 1 ед. оружия', selected: false }
    ]
})
</script>

<template>
    <FormModal v-model:isOpen="isOpen" title="Добавить инструктора" :formErrorState="formErrorState" :submit="submit">
        <FormSection label="Данные">
            <InputMain label="Фамилия" :validate="vName" :required="true" />
            <InputMain label="Имя" :validate="vName" :required="true" />
            <InputMain label="Отчество" :validate="vName" :required="true" />
            <div class="field__row2">
                <InputMain label="Возраст" :mask="numbersMask" />
                <InputMain label="Опыт (лет)" :mask="numbersMask" />
            </div>
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
            <LogoUpload label="Фотография" />
        </FormSection>

        <FormSection label="Услуги">
            <GroupRadioList _id="special" title="Специализация" name="special" v-model:selected="special"
                :data="specialData" />

            <GroupCheckList _id="services" title="Дополнительные услуги" :isAccordion="false"
                v-model="filterData.services" />

            <InputMain label="Комментарий" :isTextarea="true" :validate="vComment" class="field__descr" />

            <SelectMain label="Статус" :options="options" defaultOption="Работает" :isTopPos="true"
                class="field__select_full" />
        </FormSection>
    </FormModal>
</template>

<style scoped lang="scss"></style>