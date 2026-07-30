<script setup lang="ts">
import { useValidate, FormErrorState } from '~/lib/validate';
import { InputMain } from '~/uikit/input';
import FormSection from '~/components/FormSection.vue';
import { UiIcon } from '~/uikit/icon';
import { numbersMask } from '~/lib/validate/masks/masks';

interface IProps {
    formErrorState: FormErrorState
}
const props = defineProps<IProps>()

const { vMaxL } = useValidate(props.formErrorState);

const wearon = ref([{
    model: 'Карабин Х',
    number: '12345',
    numberPOXA: '54321'
}])

const createNewWearon = () => {
    wearon.value.push({
        model: '',
        number: '',
        numberPOXA: ''
    })
}
const deleteNewWearon = (index: number) => {
    wearon.value.splice(index, 1)
}
</script>

<template>
    <FormSection v-for="(item, index) of wearon" :label="'Оружие №' + (index + 1)">
        <InputMain label="Модель" v-model="item.model" :validate="vMaxL(20, true)" :required="true" />
        <InputMain label="Номер оружия" v-model="item.number" :validate="vMaxL(20, true)" :required="true"
            :mask="numbersMask" />
        <InputMain label="Номер РОХА" v-model="item.numberPOXA" :validate="vMaxL(20, true)" :required="true"
            :mask="numbersMask" />

        <button type="button" @click="deleteNewWearon(index)" class="lnk">
            <UiIcon name="minus" />
            Удалить оружие
        </button>
        <button type="button" v-if="index == wearon.length - 1" @click="createNewWearon" class="lnk lnk_add">
            <UiIcon name="plus" />
            Добавить оружие
        </button>
    </FormSection>

    <!-- костыль -->
    <FormSection v-if="wearon.length == 0" label="">
        <button type="button" @click="createNewWearon" class="lnk lnk_add">
            <UiIcon name="plus" />
            Добавить оружие
        </button>
    </FormSection>
</template>

<style scoped lang="scss"></style>