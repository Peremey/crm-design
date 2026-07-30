<script setup lang="ts">
import { useValidate } from '~/lib/validate';
import FormModal from '../FormModal.vue';
import { InputMain } from '~/uikit/input';
import { RadioMain } from '~/uikit/radio';
import GroupFields from '../GroupFields.vue';
import { CheckMain } from '~/uikit/check';

interface IProps {

}
const props = withDefaults(defineProps<IProps>(), {

})

const isOpen = defineModel<boolean>('isOpen')
const startHour = defineModel<string>('startHour')
const endHour = defineModel<string>('endHour')

const { formErrorState } = useValidate();

const submit = () => {

}
const special = ref('Карабин')
const services = ref([false, false])
</script>

<template>
    <FormModal v-model:isOpen="isOpen" title="Запись" :formErrorState="formErrorState" :submit="submit"
        submitBtnTitle="Записаться" variant="short">
        <div class="inscribe">
            <div class="field__row2">
                <InputMain label="с" type="time" v-model="startHour" class="novalidate" />
                <InputMain label="до" type="time" v-model="endHour" class="novalidate" />
            </div>

            <GroupFields :isAccordion="false" title="Оружие" _id="wearon">
                <RadioMain name="special" optionValue="Карабин" v-model="special" />
                <RadioMain name="special" optionValue="Пистолет" v-model="special" />
                <RadioMain name="special" optionValue="Пистолет, карабин" v-model="special" />
            </GroupFields>

            <GroupFields :isAccordion="false" title="Дополнительные услуги" _id="services">
                <CheckMain variant="three" text="Пристрелка 1 ед. оружия" v-model="services[0]" />
                <CheckMain variant="three" text="Чистка 1 ед. оружия" v-model="services[1]" />
            </GroupFields>
        </div>
    </FormModal>
</template>

<style scoped lang="scss">
.inscribe {
    display: flex;
    flex-direction: column;
    gap: r(24);
}
</style>