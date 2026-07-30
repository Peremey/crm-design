<script setup lang="ts">
import { useValidate, FormErrorState } from '~/lib/validate';
import { InputMain } from '~/uikit/input';
import FormSection from '~/components/FormSection.vue';
import { UiIcon } from '~/uikit/icon';

interface IProps {
    formErrorState: FormErrorState
}
const props = defineProps<IProps>()

const { vMaxL } = useValidate(props.formErrorState);

const auto = ref([{
    brand: 'Ауди',
    model: 'Q5',
    number: 'A7'
}])

const createNewAuto = () => {
    auto.value.push({
        brand: '',
        model: '',
        number: ''
    })
}
const deleteNewAuto = (index: number) => {
    auto.value.splice(index, 1)
}
</script>

<template>
    <FormSection v-for="(item, index) of auto" :label="'Автомобиль №' + (index + 1)">
        <InputMain label="Марка" v-model="item.brand" :validate="vMaxL(20, true)" :required="true" />
        <InputMain label="Модель" v-model="item.model" :validate="vMaxL(20, true)" :required="true" />
        <InputMain label="Госномер" v-model="item.number" :validate="vMaxL(20, true)" :required="true" />

        <button type="button" @click="deleteNewAuto(index)" class="lnk">
            <UiIcon name="minus" />
            Удалить автомобиль
        </button>
        <button type="button" v-if="index == auto.length - 1" @click="createNewAuto" class="lnk lnk_add">
            <UiIcon name="plus" />
            Добавить автомобиль
        </button>
    </FormSection>

    <!-- костыль -->
    <FormSection v-if="auto.length == 0" label="">
        <button type="button" @click="createNewAuto" class="lnk lnk_add">
            <UiIcon name="plus" />
            Добавить автомобиль
        </button>
    </FormSection>
</template>

<style scoped lang="scss"></style>