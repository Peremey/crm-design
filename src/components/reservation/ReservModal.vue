<script setup lang="ts">
import FormModal from '../FormModal.vue';
import FormSection from '../FormSection.vue';
import { SelectAutocomplete, SelectMain } from '~/uikit/select';
import { useValidate } from '~/lib/validate';
import { UiIcon } from '~/uikit/icon';
import { InputMain } from '~/uikit/input';
import GroupRadioList from '../GroupRadioList.vue';
import { type ISelectOption } from '~/types/ISelectOption';
import GroupCheckList from '../GroupCheckList.vue';
import { phoneMask } from '~/lib/validate/masks/masks';

interface IProps {
    type?: 'new' | 'edit'
}
const props = withDefaults(defineProps<IProps>(), {
    type: 'new'
})

const isOpen = defineModel<boolean>('isOpen')

const { formErrorState, vNoEmpty, vMaxL, vName, vPhone } = useValidate();
const vAuto = vMaxL(100)
const vComment = vMaxL(1000)
const vWearon = vMaxL(100)
const vBrand = vMaxL(20)
const vModel = vMaxL(20)
const vNumber = vMaxL(20)

const submit = () => {

}

const title = computed(() => {
    if (props.type == 'new')
        return "Новая запись"
    return 'Изменить запись'
})

const options = ref([
    { label: 'Иванов Иван', value: 'Иванов Иван' },
    { label: 'Петров Иван', value: 'Петров Иван' }
])
const options2 = ref([
    { label: 'Галерея №1', value: 'Галерея №1', selected: true },
    { label: 'Галерея №2', value: 'Галерея №2', selected: false },
    { label: 'Галерея №3', value: 'Галерея №3', selected: true },
    { label: 'Галерея №4', value: 'Галерея №4', selected: false },
    { label: 'Галерея №5', value: 'Галерея №5', selected: true },
    { label: 'Галерея №6', value: 'Галерея №6', selected: false },
    { label: 'Галерея №7', value: 'Галерея №7', selected: true },
    { label: 'Галерея №8', value: 'Галерея №8', selected: false }
])

const special = ref('Карабин')
const specialData = ref<ISelectOption[]>([{ label: 'Карабин', value: "Карабин" }, { label: 'Пистолет', value: "Пистолет" }, { label: 'Пистолет, карабин', value: "Пистолет,Карабин" }])

const selectedOption = ref('')

const filterData = ref({
    services: [
        { value: 'Пристрелка 1 ед. оружия', selected: false },
        { value: 'Чистка 1 ед. оружия', selected: false }
    ]
})

const isSelectedClient = ref(false)
watch(selectedOption, () => {
    if (options.value.find(item => item.value == selectedOption.value)) {
        isSelectedClient.value = true
    } else {
        isSelectedClient.value = false
    }
})

const isNewClient = ref(false)
const openNewClientFields = () => {
    isNewClient.value = true
    isSelectedClient.value = false
}
</script>

<template>
    <FormModal v-model:isOpen="isOpen" :title="title" :formErrorState="formErrorState" :submit="submit">
        <FormSection label="Клиент">
            <div v-if="!isNewClient" class="field__row2-1">
                <SelectAutocomplete v-model="selectedOption" :options="options" emptyImg="/img/av-noimg.png"
                    placeholder="Найти клиента..." :validate="vNoEmpty" class="field__row2-1" />
                <button @click="openNewClientFields" type="button" class="btn btn_white">
                    <UiIcon name="user-plus" /> Новый клиент
                </button>
            </div>

            <template v-else>
                <div class="field__row2">
                    <InputMain label="Фамилия" :validate="vName" :required="true" />
                    <InputMain label="Имя" :validate="vName" :required="true" />
                </div>
                <div class="field__row2">
                    <InputMain label="Отчество" :validate="vName" :required="true" />
                    <InputMain label="Телефон" :validate="vPhone" :mask="phoneMask" :required="true">
                        <template #iconLeft>
                            <UiIcon name="phone" />
                        </template>
                    </InputMain>
                </div>
                <InputMain label="Модель оружия" :validate="vWearon" />
            </template>
        </FormSection>

        <FormSection v-if="isSelectedClient || isNewClient" label="Автомобиль">
            <InputMain v-if="isSelectedClient" label="" :validate="vAuto" />

            <div v-else class="field__row3">
                <InputMain label="Марка" :validate="vBrand" />
                <InputMain label="Модель" :validate="vModel" />
                <InputMain label="Госномер" :validate="vNumber" />
            </div>
        </FormSection>

        <FormSection label="Длительность">
            <div class="field__row2">
                <InputMain label="с" type="time" />
                <InputMain label="до" type="time" />
            </div>
        </FormSection>

        <FormSection label="Галерея">
            <SelectMain :options="options2" defaultOption="Галерея №1" :isMulti="true" />
        </FormSection>

        <FormSection label="Дополнительно">
            <GroupRadioList _id="wearon" title="Оружие" name="special" v-model:selected="special" :data="specialData" />

            <GroupCheckList _id="services" title="Дополнительные услуги" :isAccordion="false"
                v-model="filterData.services" />

            <InputMain label="Комментарий" :isTextarea="true" :validate="vComment" class="field__descr" />
        </FormSection>

        <template #footer>
            <div class="price">
                <UiIcon name="f-money" />
                <div>Стоимость</div>
                <div></div>
                <div class="price_green">5 000 ₽</div>
            </div>
        </template>
    </FormModal>
</template>

<style scoped lang="scss">
.price {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    column-gap: r(12);
    @include m-16;

    &_green {
        color: $green;
    }
}
</style>