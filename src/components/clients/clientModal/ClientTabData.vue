<script setup lang="ts">
import { useValidate, FormErrorState } from '~/lib/validate';
import { type ISelectOption } from '~/types/ISelectOption';
import { InputMain } from '~/uikit/input';
import { SelectMain } from '~/uikit/select';
import FormSection from '~/components/FormSection.vue';
import { UiIcon } from '~/uikit/icon';
import LogoUpload from '~/components/shootRange/parameters/LogoUpload.vue';
import { phoneMask } from '~/lib/validate/masks/masks';

interface IProps {
    formErrorState: FormErrorState
}
const props = defineProps<IProps>()

const { vMaxL, vName, vPhone, vEmail } = useValidate(props.formErrorState)

const vFName = vName
const vLName = vName
const vPName = vName
const vComment = vMaxL(1000)

const options = ref<ISelectOption[]>([{ label: 'Работает', value: "Работает" }, { label: 'Не работает', value: "Не работает" }])
</script>

<template>
    <FormSection label="Клиент">
        <InputMain label="Фамилия" :validate="vLName" :required="true" />
        <div class="field__row2">
            <InputMain label="Имя" :validate="vFName" :required="true" />
            <InputMain label="Отчество" :validate="vPName" :required="true" />
        </div>
        <div class="field__row2">
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
        </div>
        <LogoUpload label="Фотография" />
    </FormSection>

    <FormSection label="Дополнительно">
        <InputMain label="Комментарий" :isTextarea="true" :validate="vComment" class="field__descr" />
        <SelectMain label="Статус" :options="options" defaultOption="Работает" :isTopPos="true"
            class="field__select_full" />
    </FormSection>
</template>

<style scoped lang="scss">
.field__select_full {
    margin-bottom: r(24);
}
</style>